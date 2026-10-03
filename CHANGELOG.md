# Changelog

## 2026-10-03 — Recipe-backed types and bare-question drafts

Experimental, commissioned as a test of the IMD swarm. It may not work as described. Read the code, start with small amounts, no warranty.

1. **Replace or re-type the 12 unpayable bodies.** The live docs list no recipe for a scalar `address` or `bytes32` (and a saved paid request ended `recipe yields bool, request asks for uint256`), so those types are gone from the pack. 11/12 owner → USDC `paused()` bool (mainnet, Base); 13 pauser → `Blacklisted` log count over 720 h; 14/15 largest recipient/sender → WETH `Deposit`/`Withdrawal` wad sums; 21 → v2 pair WETH balance floor (bool); 22 → Base WETH `Deposit` count; 23 → mainnet v4 native-ETH pool `Initialize` count; 24 → WETH depositor ranking (`address[]`); 25 → Base USDC `Transfer` sum; 29/30 reserve words → Base USDC sender ranking and WETH withdrawer ranking (`address[]`). Each body's type equals the type the live check proposes in the final run.
2. **Bare-question drafts.** `draftInput` no longer pastes definitions into the question; every question was reworded to carry period, unit, order and tie rule itself. Final run: 30/30 judged, no blockers, no `wording`, `not_answerable` or `answer_type` suggestion, recorded in `results.json` (copy in `test/live/bare/`). The service is noisy: identical text sometimes drew `wording` or flipped the proposed type, so wordings were chosen by repeated live samples and the full run repeated until clean. Bodies 04/05 were reworded (the old 05 drew `not_answerable`).
3. **Quality of the questions.** Dropped near-constants: 01/02 (`totalSupply() > 0`) → Uniswap pool WETH balance floors, 11/12 fixed owner → pause flag. At most three per pattern (audit in `questions/README.md`). 09/10 (Robinhood block and transaction counts) drew `wording` on every attempt and have no recipe; replaced by Base v4 native-pool and USDC transfer counts. 28 moved to Base USDC and 26 to mainnet WBTC (v4 pools) after the previous tokens drew `wording` or an `address[]` proposal. Chain evidence is kept for all chain data; 04/05 stay `panel`.
4. **Docs.** `validatePack` now requires the four recipe-backed types and rejects scalar `address`/`bytes32` instead of requiring five per type. README, GUIDE, catalog and index no longer list any body as unpayable. Added a test that drafts are bare and each body's type matches the recorded live proposal. Live GET/POST captures are in `test/live/bare/`.

`npm run validate` and all 12 offline tests pass. No paid request, deployment or token change. Not changed: 03, 18 and 19 (block/transaction scans) still lack a listed recipe. Existing experimental labels are kept.

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
