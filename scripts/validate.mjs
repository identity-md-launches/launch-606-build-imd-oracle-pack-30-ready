import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

export const ROOT = fileURLToPath(new URL('../', import.meta.url));
export const WARNING = 'Experimental, commissioned as a test of the IMD swarm. It may not work as described. Read the code, start with small amounts, no warranty.';
export const TYPES = ['bool', 'uint256', 'address', 'address[]', 'bytes32', 'bytes32[]'];
const address = /^0x[0-9a-fA-F]{40}$/;
const hash = /^0x[0-9a-fA-F]{64}$/;
const decimal = /^(0|[1-9][0-9]*)$/;
const maxUint = (1n << 256n) - 1n;
const object = x => x !== null && typeof x === 'object' && !Array.isArray(x);
const length = (x, lo, hi) => typeof x === 'string' && x.length >= lo && x.length <= hi;
const integer = (x, lo, hi) => Number.isSafeInteger(x) && x >= lo && x <= hi;

// Structural limits from https://imd.fun/docs/#oracle-body, observed 2026-10-02.
// This cannot check wording, RPC availability, recipes or live admission.
export function validateBody(body) {
  const errors = [];
  const need = (ok, message) => { if (!ok) errors.push(message); };
  const keys = (x, allowed, label) => {
    if (object(x)) for (const k of Object.keys(x)) need(allowed.includes(k), `${label}: unknown field ${k}`);
  };
  need(object(body), 'body must be an object');
  if (!object(body)) return errors;
  keys(body, ['v','question','chainId','window','answerType','evidence','panelSize','quorum','validForSeconds','head','definitions','guards','toleranceBps','consumer','allowAmbiguous'], 'body');
  need(body.v === 1, 'v must be 1');
  need(length(body.question, 1, 2000), 'question must be 1..2000 characters');
  need(integer(body.chainId, 1, Number.MAX_SAFE_INTEGER), 'chainId must be a positive safe integer');
  need(TYPES.includes(body.answerType), 'unsupported answerType');
  need(integer(body.panelSize, 5, 100), 'panelSize must be 5..100 (observed capability limits)');
  need(integer(body.quorum, 2, body.panelSize), 'quorum must be 2..panelSize');
  need(integer(body.validForSeconds, 60, 2592000), 'validForSeconds must be 60..2592000');
  if (body.evidence !== undefined) need(['chain','panel'].includes(body.evidence), 'evidence must be chain or panel');
  const w = body.window;
  need(object(w), 'window must be an object');
  if (object(w)) {
    if ('hours' in w) {
      keys(w, ['hours'], 'window');
      need(integer(w.hours, 1, 720), 'window.hours must be 1..720');
    } else {
      keys(w, ['fromBlock','toBlock'], 'window');
      need(integer(w.fromBlock, 0, Number.MAX_SAFE_INTEGER) && integer(w.toBlock, w.fromBlock, Number.MAX_SAFE_INTEGER), 'window blocks must be safe nonnegative integers, fromBlock <= toBlock');
    }
  }
  if (body.head !== undefined) {
    need(integer(body.head, 1, 32), 'head must be 1..32');
    need(body.answerType?.endsWith('[]'), 'head requires a list answer');
  }
  if (body.toleranceBps !== undefined) {
    need(integer(body.toleranceBps, 0, 10000), 'toleranceBps must be 0..10000');
    need(body.answerType === 'uint256', 'toleranceBps requires uint256');
  }
  if (body.allowAmbiguous !== undefined) need(typeof body.allowAmbiguous === 'boolean', 'allowAmbiguous must be boolean');
  if (body.definitions !== undefined) {
    need(object(body.definitions), 'definitions must be a map');
    if (object(body.definitions)) for (const [k, v] of Object.entries(body.definitions)) {
      need(length(k, 1, 64), 'definition key must be 1..64 characters');
      need(length(v, 1, 512), `definition ${k} must be 1..512 characters`);
    }
  }
  const g = body.guards;
  if (g !== undefined) {
    need(object(g), 'guards must be an object');
    if (object(g)) {
      keys(g, ['allow','deny','mustHaveCode','min','max','sources','minSources'], 'guards');
      for (const [key, cap] of [['allow',256], ['deny',1024]]) if (g[key] !== undefined) {
        need(Array.isArray(g[key]) && g[key].length >= 1 && g[key].length <= cap, `guards.${key} must have 1..${cap} entries`);
        const pattern = body.answerType?.startsWith('address') ? address : hash;
        need(['address','address[]','bytes32','bytes32[]'].includes(body.answerType), `guards.${key} requires addresses or bytes32`);
        if (Array.isArray(g[key])) need(g[key].every(x => typeof x === 'string' && pattern.test(x)), `guards.${key} has invalid values for answerType`);
      }
      if (g.mustHaveCode !== undefined) {
        need(typeof g.mustHaveCode === 'boolean', 'guards.mustHaveCode must be boolean');
        need(body.answerType?.startsWith('address'), 'guards.mustHaveCode requires addresses');
      }
      for (const key of ['min','max']) if (g[key] !== undefined) {
        need(body.answerType === 'uint256', `guards.${key} requires uint256`);
        const valid = typeof g[key] === 'string' && decimal.test(g[key]) && g[key].length <= 78;
        need(valid && BigInt(g[key]) <= maxUint, `guards.${key} must be a uint256 decimal string`);
      }
      if (typeof g.min === 'string' && typeof g.max === 'string' && decimal.test(g.min) && decimal.test(g.max)) need(BigInt(g.min) <= BigInt(g.max), 'guards.min exceeds max');
      if (g.sources !== undefined) {
        need(Array.isArray(g.sources) && g.sources.length >= 1 && g.sources.length <= 32, 'guards.sources must have 1..32 entries');
        if (Array.isArray(g.sources)) need(g.sources.every(x => {
          if (!length(x,1,512)) return false;
          try { return ['http:','https:'].includes(new URL(x).protocol); } catch { return false; }
        }), 'guards.sources must be HTTP(S) URL prefixes, max 512 characters');
      }
      if (g.minSources !== undefined) need(integer(g.minSources,1,32), 'guards.minSources must be 1..32');
    }
  }
  if (body.consumer !== undefined) {
    const c = body.consumer;
    need(object(c), 'consumer must be an object');
    if (object(c)) {
      keys(c, ['chainId','verifyingContract'], 'consumer');
      need(integer(c.chainId,1,Number.MAX_SAFE_INTEGER) && typeof c.verifyingContract === 'string' && address.test(c.verifyingContract), 'consumer needs chainId and verifyingContract address');
    }
  }
  return errors;
}

export async function loadPack(directory = resolve(ROOT, 'questions')) {
  const files = (await readdir(directory)).filter(f => f.endsWith('.json')).sort();
  const entries = [];
  for (const file of files) {
    const raw = await readFile(resolve(directory,file), 'utf8');
    entries.push({file, raw, body:JSON.parse(raw)});
  }
  return entries;
}

export function validatePack(entries) {
  const errors = [];
  if (entries.length !== 30) errors.push('pack must contain exactly 30 JSON bodies');
  for (const {file,body} of entries) for (const e of validateBody(body)) errors.push(`${file}: ${e}`);
  for (const type of TYPES) if (entries.filter(x => x.body.answerType === type).length !== 5) errors.push(`${type}: pack must contain five bodies`);
  for (const chain of [1,8453,4663]) if (!entries.some(x => x.body.chainId === chain)) errors.push(`missing chain ${chain}`);
  for (const mode of ['chain','panel']) if (!entries.some(x => x.body.evidence === mode)) errors.push(`missing evidence ${mode}`);
  return errors;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const errors = validatePack(await loadPack());
    if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
    else console.log('30 bodies pass local structural checks; five per answer type. No network calls.');
  } catch (e) { console.error(e.message); process.exitCode = 1; }
}
