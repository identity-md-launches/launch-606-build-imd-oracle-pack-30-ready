import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkInput, checkPack, draftInput, ENDPOINT } from '../scripts/check.mjs';
import { loadPack, validatePack, validateBody } from '../scripts/validate.mjs';

const response = (status, data) => new Response(JSON.stringify(data), {status});
const noWait = async ms => assert.ok(ms >= 3000);

test('all 30 bodies and their semantic draft inputs fit limits', async () => {
  const pack = await loadPack();
  assert.deepEqual(validatePack(pack),[]);
  for (const {body} of pack) assert.ok(draftInput(body).question.length <= 2000);
  const bad = structuredClone(pack[0].body);
  bad.panelSize = 4; bad.quorum = 7; bad.window.hours = 721;
  assert.ok(validateBody(bad).length >= 3);
});

test('transport failures exhaust exactly three spaced retries', async () => {
  let calls = 0; const waits = [];
  const result = await checkInput({}, {
    fetchFn:async () => {calls++; throw new TypeError('offline');},
    wait:async ms => waits.push(ms)
  });
  assert.equal(calls,4); assert.deepEqual(waits,[3000,3000,3000]);
  assert.equal(result.verdict,'network_unreachable');
  assert.match(result.attempts[3].reason,/offline/);
  assert.ok(!Number.isNaN(Date.parse(result.date)));
});

test('retries transient server errors and records semantic blockers without retry', async () => {
  let calls = 0;
  const result = await checkInput({question:'test'}, {
    fetchFn:async (url, options) => {
      assert.equal(url,ENDPOINT); assert.equal(options.method,'POST');
      assert.equal(JSON.parse(options.body).action,'oracle.request');
      calls++; return calls === 1 ? response(503,{error:'busy'}) : response(200,{blockers:['ambiguous']});
    }, wait:noWait
  });
  assert.equal(calls,2); assert.equal(result.verdict,'blocked');
  assert.deepEqual(result.attempts[1].response.blockers,['ambiguous']);
});

test('malformed success responses retry; a bare HTTP 200 does not imply acceptance', async () => {
  let calls = 0;
  const result = await checkInput({}, {
    fetchFn:async () => ++calls === 1 ? new Response('not json') : response(200,{request:{}}), wait:noWait
  });
  assert.equal(calls,2); assert.equal(result.verdict,'unclassified_response');
  assert.equal(result.attempts[0].responseText,'not json');
});

test('HTTP 422 is recorded once without treating it as a network failure', async () => {
  let calls = 0;
  const result = await checkInput({}, {fetchFn:async () => {calls++;return response(422,{error:'invalid_input'});},wait:noWait});
  assert.equal(calls,1); assert.equal(result.verdict,'http_error');
});

test('exact body rejection and draft verdict remain separate in persisted report', async () => {
  const directory = await mkdtemp(join(tmpdir(),'imd-pack-test-'));
  try {
    const [entry] = await loadPack(); let calls = 0;
    const output = join(directory,'results.json');
    const report = await checkPack([entry], {output, wait:noWait, check:input => checkInput(input, {
      fetchFn:async () => ++calls === 1
        ? response(400,{error:'invalid_request',detail:'request: Unrecognized keys: "window"'})
        : response(200,{blockers:[],request:{window:{hours:24}}}),wait:noWait
    })});
    assert.equal(calls,2);
    assert.equal(report.results[0].full.verdict,'http_error');
    assert.equal(report.results[0].draft.verdict,'no_blockers');
    assert.ok(report.results[0].draft.omittedFields.includes('window'));
    assert.equal(report.results[0].sha256.length,64);
    assert.ok(report.results[0].draft.input.question.includes('missing:'));
    assert.deepEqual(JSON.parse(await readFile(output,'utf8')),report);
    assert.ok(report.completedAt);
  } finally {await rm(directory,{recursive:true,force:true});}
});

test('recorded outcomes cover current file bytes, with dates and full responses', async () => {
  const { createHash } = await import('node:crypto');
  const { ROOT } = await import('../scripts/validate.mjs');
  const report = JSON.parse(await readFile(join(ROOT,'results.json'),'utf8'));
  const pack = await loadPack();
  assert.equal(report.results.length,30);
  assert.ok(report.completedAt);
  for (const {file,raw} of pack) {
    const record = report.results.find(x => x.file === `questions/${file}`);
    assert.ok(record);
    assert.equal(record.sha256,createHash('sha256').update(raw).digest('hex'));
    assert.ok(!Number.isNaN(Date.parse(record.date)));
    assert.ok(record.full.attempts.length >= 1 && record.full.attempts.length <= 4);
    assert.equal(typeof record.verdict,'string');
  }
});
