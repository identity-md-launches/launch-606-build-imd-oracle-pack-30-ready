# Changelog

## 2026-10-02 — Review corrections

Experimental, commissioned as a test of the IMD swarm. It may not work as described. Read the code, start with small amounts, no warranty.

1. **Malformed spender and constant allowance (48371a…).** Reproduced the 41-digit literal. Replaced 23 with the latest WETH-paired v4 Initialize pool ID over a pinned 24-hour window, removing the permanently zero pair allowance. Added local checks for malformed hexadecimal literals in question/definition text and a regression using the reported address.
2. **Known recipe mismatch (b3c3b2…).** Re-fetched both reported paid requests: each remains `mismatch`, with failure `recipe yields bool, request asks for uint256`. README, GUIDE and catalogs now explicitly say not to pay for 11–15, 21–25 or 29–30 on the current service. Kept required types and chain evidence; no paid request or attestation is claimed. Scalar selections in 14/15/23 also lack a compatible recipe.
3. **Bridge dust balance (e729f1…).** Replaced the Base L2StandardBridge holder in 22 with the Uniswap USDC/WETH pool, so the metric is actual pool WETH liquidity rather than an alleged custody reserve. Saved its Uniswap page; read-only RPC attempts were HTTP 403, so no measured reserve is claimed.
4. **Immutable assets and pair address (6b52e7…).** Replaced 13 with mutable USDC pauser governance, 14 with the largest USDC inflow account and 15 with the largest WETH outflow account during pinned 24-hour windows. Removed underlying-asset code guards. Audited patterns independent of encoding: administrative roles 11/12/13 and recipient-value ranking 14/16/17 each have three; all others have at most three.
5. **Variable draft/type advice (33b624…).** Reproduced `answer_type` advice on identical body-21 input. Reworded 21/22/25 to request exact bytes32 hexadecimal ABI data, preserved service proposals/advice, and made `answer_type` fail the gate alongside wording/not_answerable. Documentation now calls every screen a dated sample rather than a guaranteed body property. Retained original advice and subsequent probes; refreshed results for all 30 current hashes.
6. **Constant September release facts (d2b6a6…).** Changed 04/05 to completed trailing 30-day intervals ending at the latest already-finalized block timestamp, resolved once at request time. The consumer use case is an upgrade review after a recent publication. Saved the first flagged rolling wording and the clarified live samples; GUIDE and catalogs match the new boundaries.

Live evidence is under `test/live/revision/`; full-body rejection and draft success stay separate. Final current-file samples: 30/30 judged, zero blockers and zero suggestions; all 30 hashes match. `npm run validate`, all 11 offline tests and `git diff --check` passed. All existing experimental labels remain verbatim. No configuration, dependency, deployment, payment or token changes.

## 2026-10-02 — Draft wording and consumer-useful questions

Experimental, commissioned as a test of the IMD swarm. It may not work as described. Read the code, start with small amounts, no warranty.

1. **Rewrite flagged drafts and correct evidence.** Made relative durations and the finalized observation anchor explicit in 01, 03, 06–10 and 16–19. Changed the two release examples (04/05) to the completed September 2024 UTC interval. Body 02 already screened cleanly and is unchanged. Every chain-data question now uses `chain`; only release questions use `panel`. Body 10 needed a second live check after explicitly including successful, reverted and system transactions.
2. **Replace header/transaction trivia.** Kept the numbered slots and five bodies per answer type; renamed the replacement files to describe their new metrics:
   - 11/12: block beneficiaries → Ethereum/Base USDC owner checks.
   - 13/14: beneficiary/first sender → Uniswap pair token0/token1 asset checks.
   - 15: first sender → DAI/WETH pair lookup.
   - 20: beneficiary ranking → IMD sender ranking by gross transferred value.
   - 21/22: block hashes → Ethereum/Base WETH custody balances encoded as bytes32 integers.
   - 23: block hash → WETH allowance encoded as bytes32.
   - 24: parent hash → USDC pause flag encoded as bytes32 0/1.
   - 25: parent hash → Base WETH supply encoded as bytes32.
   - 26–28: recent block hashes → token-specific Uniswap v4 pool-volume rankings.
   - 29/30: transaction hashes → USDC/WETH and DAI/WETH reserve pairs encoded as bytes32 arrays.
   The catalog audits metric patterns independently of chain and encoding: maximum three examples per pattern. All six answer types and chains 1, 8453 and 4663 remain represented.
3. **Re-check, record and document.** Sent all 30 exact bodies and their documented draft projections to the live free API. All exact bodies still receive the known unknown-field rejection; the saved final draft samples were judged with zero blockers and zero suggestions (later identical-input screening can differ). `results.json` contains dates, current file hashes, full responses and the separate body-10 recheck provenance. Saved live GET bodies, exploratory POST probes, the initial body-10 advice and final POST responses under `test/live/`. The offline success/fallback mock now derives from a captured live response; fault-injection tests remain synthetic. Added a quality gate rejecting wording/not_answerable advice or unjudged responses. Updated README, GUIDE and both catalogs, including all renamed links and the limitation that draft acceptance does not prove recipe support. Preserved every existing experimental label verbatim.

Validation: `npm run validate` passed all 30 bodies and draft-length checks passed in `npm test`; all 9 tests passed. No dependencies, configuration, contract deployments, payments or token changes. Scalar address/bytes32 calls, reserve-word arrays and transaction/block scans still lack recipes in the retrieved live documentation; paid execution is not claimed.
