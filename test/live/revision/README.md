# Revision live evidence — 2026-10-02

These are network observations, not fabricated oracle answers. No quote, payment, paid submission or deployment was made.

- `<request UUID>.json`: exact response bodies from GET `https://api.imd.fun/oracle/requests/<UUID>?members=0` for `b23e854e-6ead-4ff8-8ba4-3b6bfdcb0fb9` and `01a65559-803f-4e36-9a0a-1f8e1988dcb6`. Both expose the bool/uint256 recipe mismatch.
- `health.json`: GET `https://api.imd.fun/health`.
- `docs.html`: GET `https://imd.fun/docs/`; the recipe table has bool-only `call-compare` and array-only `log-rank`, with no scalar address/bytes32 recipe.
- `before-21-*.json`, `before-22-*.json`: the original bodies’ documented draft inputs and complete free POST `https://api.imd.fun/requests/check` attempts. Body 21 received `answer_type`; body 22 did not in this sample.
- `rolling-release-first-screen.json`, `release-second-*.json`, `roles-second-*.json`, `rank-*.json`: sent inputs and free POST responses during wording revision. Failed screens and superseded role probes are retained as provenance, not final deliverables.
- `first-batch.json`: the first complete all-30 live run, including advice that required further changes.
- `final-batch-before-rank-rechecks.json`: complete subsequent all-30 run before replacement of 14/15’s temporary governance-role drafts.
- `rank-rechecks.json`: exact-body and documented-draft free POST checks for the final 14/15 replacements. Root `results.json` combines the subsequent all-30 run with these rechecks, recording each final file’s exact hash and provenance.
- `final-checks.json`: copy of the final root report; each stored response is a sample at its attempt date.
- `circle-token-design.md`: GET `https://raw.githubusercontent.com/circlefin/stablecoin-evm/master/doc/tokendesign.md`, establishing mutable roles for 13.
- `base-pool.html`: GET `https://app.uniswap.org/explore/pools/base/0xd0b53D9277642d899DF5C87A3966A349A798F224`, the pool used for 22.
- `v4-events.sol`: GET `https://raw.githubusercontent.com/Uniswap/v4-core/main/src/interfaces/IPoolManager.sol`, the Initialize event ABI used for 23.
- `base-balance-calls.json`, `base-pool-calls.json`: attempted read-only `eth_call` requests to `https://mainnet.base.org` and `https://base-rpc.publicnode.com`; these returned HTTP 403. They are failed verification attempts, not reserve measurements.

`test/check.test.mjs` replays the captured full-body rejection/draft response in `../check-example.json`; its mismatch regression reads the two GET captures above. Injected transport errors and advice are explicit synthetic fault cases. None of these offline tests establishes a new live result.
