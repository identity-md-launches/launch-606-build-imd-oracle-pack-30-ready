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

`results.json` at repository root is the current complete report. Full-body HTTP 400 rejections remain separate from draft HTTP 200 successes. Each saved verdict is a sample at its recorded date, not a property of the body or a guarantee of later screening. Identical input can produce different type advice; the revision reproduced `answer_type` on body 21. These captures are screening evidence, not executed chain answers or attestations.

`revision/` retains the two live GET paid-call mismatch responses, a fresh API health response and docs, pre-edit 21/22 draft screens, rolling-release and role wording probes, and the final all-30 report. It also saves Circle role documentation, the Uniswap Base pool page and the v4 event interface used to choose replacements. `base-*-calls.json` records failed read-only RPC attempts (HTTP 403), not successful state verification. See `revision/README.md` for provenance.
