# Live evidence — 2026-10-02

These are saved network response bodies, not generated expected answers. Only read-only GETs and the free draft-check POST were used. No paid quote or submission was made.

| File | Request / purpose |
|---|---|
| `health.json` | GET https://api.imd.fun/health — live service availability |
| `version.json` | GET https://api.imd.fun/version — observed deployment commit |
| `oracle-requests.json` | GET https://api.imd.fun/oracle/requests?limit=3&status=attested — actual typed requests and pinned-window shape |
| `docs.html` | GET https://imd.fun/docs/ — full original documentation response, including draft schema and recipe list |
| `probe-*.json` | POST https://api.imd.fun/requests/check — initial wording experiments, with sent input and complete response attempts |
| `10-before-wording-repair.json` | First revised body-10 result, retaining the wording suggestion that prompted another edit |
| `recheck-10.json` | Full body-10 recheck report after that edit |
| `checks.json` | All final full-body and draft response attempts, extracted without changing their response objects from results.json; includes file hashes and dates |
| `check-example.json` | Body-01 full/draft response used for offline replay and explicitly injected failure/advice tests |

`results.json` at repository root is the current complete report. Its initial pass covered all 30 bodies; `rechecks` identifies the later replacement of body 10's result. Full-body HTTP 400 rejections remain separate from draft HTTP 200 successes. The final 30 draft responses all have `judged: true`, `blockers: []` and `suggestions: []`. These captures are screening evidence, not executed chain answers or attestations.
