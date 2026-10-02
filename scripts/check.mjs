import { writeFile, rename } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as sleep } from 'node:timers/promises';
import { ROOT, WARNING, loadPack, validatePack } from './validate.mjs';

export const ENDPOINT = 'https://api.imd.fun/requests/check';
const draftKeys = ['question','panelSize','answerType','evidence','chainId','toleranceBps','head'];
export function draftInput(body) {
  // The documented check route accepts a draft, not all quote input fields.
  // Put definitions into question text so its semantic screen can see them.
  const question = [body.question, ...Object.entries(body.definitions ?? {}).map(([k,v]) => `${k}: ${v}`)].join('\n');
  if (question.length > 2000) throw new Error('draft question plus definitions exceeds 2000 characters');
  return {...Object.fromEntries(draftKeys.filter(k => k in body).map(k => [k,body[k]])), question};
}

export async function checkInput(input, {fetchFn = fetch, wait = sleep, timeoutMs = 30000, now = () => new Date().toISOString()} = {}) {
  const attempts = [];
  for (let i = 0; i <= 3; i++) {
    if (i > 0) await wait(3000); // three retries, at least 3s after each failure
    const attempt = {date:now(), number:i + 1};
    let retry = false;
    try {
      const response = await fetchFn(ENDPOINT, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({action:'oracle.request',input}),
        signal:AbortSignal.timeout(timeoutMs)
      });
      attempt.httpStatus = response.status;
      const raw = await response.text();
      try { attempt.response = JSON.parse(raw); }
      catch { attempt.responseText = raw; }
      const r = attempt.response;
      if (!response.ok) {
        attempt.verdict = 'http_error';
        retry = [408,425,429].includes(response.status) || response.status >= 500;
      } else if (!r || typeof r !== 'object' || Array.isArray(r)) {
        attempt.verdict = 'invalid_response'; retry = true;
      } else if (Array.isArray(r.blockers)) {
        attempt.verdict = r.blockers.length ? 'blocked' : 'no_blockers';
      } else {
        attempt.verdict = 'unclassified_response'; // never infer acceptance from HTTP 200 alone
      }
    } catch (error) {
      attempt.verdict = 'network_unreachable';
      attempt.reason = `${error.name}: ${error.message}${error.cause?.code ? ` (${error.cause.code})` : ''}`;
      retry = true;
    }
    attempts.push(attempt);
    if (!retry || i === 3) break;
  }
  const last = attempts.at(-1);
  return {date:last.date, verdict:last.verdict, attempts};
}

export async function checkPack(entries, {output = resolve(ROOT,'results.json'), check = checkInput, wait = sleep, now = () => new Date().toISOString()} = {}) {
  const report = {experimental:WARNING, endpoint:ENDPOINT, startedAt:now(), completedAt:null,
    policy:{maxRetries:3, retryDelayMs:3000, mode:'exact body, then documented draft on unknown-field rejection'},
    note:'A no_blockers draft is a wording/admission screen, not a check of omitted fields or a signed oracle result. Suggestions are non-blocking service advice; read them before spending.', results:[]};
  const save = async () => {
    await writeFile(output + '.tmp', JSON.stringify(report,null,2) + '\n');
    await rename(output + '.tmp',output);
  };
  await save();
  for (const {file,raw,body} of entries) {
    const full = await check(body);
    const result = {file:`questions/${file}`, sha256:createHash('sha256').update(raw).digest('hex'), date:full.date, verdict:full.verdict, full};
    const last = full.attempts.at(-1);
    if (last?.response?.error === 'invalid_request' && /Unrecognized keys/i.test(last.response.detail ?? '')) {
      await wait(3000);
      const input = draftInput(body);
      result.draft = {input, omittedFields:Object.keys(body).filter(k => !draftKeys.includes(k)), ...(await check(input))};
      result.verdict = `full_body_rejected; draft_${result.draft.verdict}`;
      result.date = result.draft.date;
    }
    // Non-blocking advice (wording, evidence, not_answerable...) does not change the exit code but is surfaced.
    const codes = [...new Set(((result.draft ?? full).attempts.at(-1)?.response?.suggestions ?? []).map(s => s?.code).filter(Boolean))];
    if (codes.length) {
      result.suggestions = codes;
      result.verdict += `; suggestions: ${codes.join(',')}`;
    }
    report.results.push(result);
    await save();
    console.log(`${file}: ${result.verdict}`);
    if (report.results.length < entries.length) await wait(3000);
  }
  report.completedAt = now();
  await save();
  return report;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help')) {
    console.log(`${WARNING}\n\nUsage: node scripts/check.mjs [--output PATH]\nNode 20+, built-in fetch only. Sends all 30 exact bodies to the free check\nendpoint; on unknown-field rejection also checks the documented draft,\nwith definitions appended to question text. Records raw responses, UTC dates,\nbody hashes and non-blocking suggestion codes. Retries transport failures, 408/425/429/5xx and malformed\nresponses up to 3 times, at least 3 seconds apart. 30-second timeout per call.\nNo payment, quote, wallet or oracle submission.\n--output PATH  Save results elsewhere (default: repository results.json).\nExit 0: every exact body or fallback draft had no blockers.\nExit 1: blocked, network/HTTP failure, unclassified response, or local error.`);
    return;
  }
  let output = resolve(ROOT,'results.json');
  if (args.length) {
    if (args.length !== 2 || args[0] !== '--output' || !args[1]) throw new Error('Use --help for valid options');
    output = resolve(args[1]);
  }
  const entries = await loadPack();
  const errors = validatePack(entries);
  if (errors.length) throw new Error(errors.join('\n'));
  for (const {body} of entries) draftInput(body); // fail before starting any network calls
  const report = await checkPack(entries,{output});
  if (report.results.some(r => (r.draft ?? r.full).verdict !== 'no_blockers')) process.exitCode = 1;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main().catch(e => { console.error(e.message); process.exitCode = 1; });
