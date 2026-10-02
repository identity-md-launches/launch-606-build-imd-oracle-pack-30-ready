# Changelog

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
3. **Re-check, record and document.** Sent all 30 exact bodies and their documented draft projections to the live free API. All exact bodies still receive the known unknown-field rejection; all final drafts are judged with zero blockers and zero suggestions. `results.json` contains dates, current file hashes, full responses and the separate body-10 recheck provenance. Saved live GET bodies, exploratory POST probes, the initial body-10 advice and final POST responses under `test/live/`. The offline success/fallback mock now derives from a captured live response; fault-injection tests remain synthetic. Added a quality gate rejecting wording/not_answerable advice or unjudged responses. Updated README, GUIDE and both catalogs, including all renamed links and the limitation that draft acceptance does not prove recipe support. Preserved every existing experimental label verbatim.

Validation: `npm run validate` passed all 30 bodies and draft-length checks passed in `npm test`; all 9 tests passed. No dependencies, configuration, contract deployments, payments or token changes. Scalar address/bytes32 calls, reserve-word arrays and transaction/block scans still lack recipes in the retrieved live documentation; paid execution is not claimed.
