# Wording questions for panel agreement

Experimental, commissioned as a test of the IMD swarm. It may not work as described. Read the code, start with small amounts, no warranty.

This guide adds an **answer normalization contract** and a review procedure to two existing reports:

- [Oracle wording report: follower-list intersection](https://github.com/Identity-md/research/blob/main/jobs/f5bca911-0dbd-4128-b69c-7e979455009f/files/artifacts/report.md) (27 September 2026) reproduced ambiguity refusals and showed that admission does not establish data accessibility.
- [Designing Jobs:Research prompts](https://github.com/Identity-md/research/blob/main/jobs/3a780d65-516e-4be7-a565-d304f1c60998/files/artifacts/report.md) (25 September 2026) proposed controlled seams, observable assertions and repeated trials.

Those reports explain ambiguity and test design. The recommendations below apply their findings to a typed value that must match across seats. They are design recommendations, not measured claims that these 30 requests will reach quorum. Field limits and recipe support come from the [current API docs, Oracle body and Oracle sections](https://imd.fun/docs/).

## Start with the value your consumer can safely use

Write a sentence describing the consumer's decision before choosing the metric. A supply-positive boolean can enable a display; it cannot establish solvency. A gross inflow ranking can select research candidates; it cannot establish wallet wealth or human popularity. Name what the answer establishes so a correct panel answer does not become an incorrect product decision.

Then write the normalization contract: entity, observation anchor, complete input corpus, operation, units, order, tie rule and failure condition. Different seats should obtain the same value even if they find evidence in a different order. Put this contract in `definitions`, using short named entries under the 512-character value limit. Keep the central operation and entity in `question` too.

For example, `04` asks about release publication during the 30 days ending at the pinned finalized block timestamp. Pin that endpoint once; never substitute the checker’s separate default window. `01` asks about a view call at the closing block. It does not ask whether the predicate was true at any point in the window. Mixing these two interpretations is a common way to produce honest disagreement.

## Resolve three clocks separately

| Clock | Write down | Failure to avoid |
|---|---|---|
| Observation | Exact quoted blocks, or a fixed off-chain UTC interval | Seats silently using different latest states |
| Evidence eligibility | Which timestamp or block membership admits each record | Release creation mistaken for publication; events outside the window |
| Consumer freshness | `validForSeconds` after signing | Treating signature lifetime as observation time |

For chain windows this pack explicitly includes both block endpoints. When adapting a body, inspect the drafted/quoted window and closing hash and confirm that the intended observation still fits. A one-hour window quoted twice is two different observations. For an off-chain fact, specify which clock controls it; the EIP-712 domain chain is not proof that a GitHub event happened on that chain.

## Make the last normalization step explicit

| Type | State in the question or definitions |
|---|---|
| `bool` | Strict or inclusive comparison, and what evidence proves false |
| `uint256` | Raw units, sum versus count, duplicate key, and any rounding before comparison |
| `address` | The exact 20-byte field, not a label, identity or inferred owner |
| `address[]` | Candidate set, unique keys, score, direction, tie break and short-list behavior |
| `bytes32` | Named value and exact encoding: e.g. unsigned reserve or balance, big-endian and zero-padded to 32 bytes; never an unspecified hash |
| `bytes32[]` | Pool ID selection/ranking or fixed tuple positions; distinguish identifiers from encoded amounts |

Consider `16`, the IMD recipient ranking. “Top recipients” is insufficient: a panel could rank net balances, transfer counts or gross incoming value. The body chooses summed raw `Transfer.value`, excludes the zero recipient, requires positive totals, and breaks ties numerically. An address casing difference must not change numeric order. It does not merge addresses into supposed people.

For `29`, entries are exactly `[reserve0, reserve1]`, each encoded as an unsigned bytes32 integer in raw asset units. Reversing them changes the consumer's liquidity test. For `26`, entries are pool IDs ordered by summed absolute swap amounts for one named token, with numeric pool-ID tie breaks. `head: 3` governs leading-entry agreement; it does not invent missing pools. Return fewer only for a complete scan with fewer eligible pools. Zero reserves are valid; missing calls are not zero reserves.

Use `toleranceBps` only after establishing identical units and rounding. It is not a remedy for different definitions. Counts and raw event sums in this pack use zero tolerance. A tolerable numerical error also needs a consumer-side rationale: an answer near a liquidation or payout boundary is different from an approximate dashboard count.

## Choose evidence by reproducibility, not by subject matter

Use `evidence: chain` for chain data, including contract calls and RPC-derived activity. Reserve `panel` for the two GitHub release questions. Do not change the evidence label to hide a missing recipe. The live docs list call comparisons, log sums/counts/rankings and v4 calculations. They do not list scalar address or bytes32 calls, reserve-word arrays, or block/transaction scanning recipes. Thus clean draft checks for those examples establish wording admission only; the current recipe cannot attest those answer types. Live scalar calls already ended in `mismatch` with "recipe yields bool, request asks for uint256" (saved in `test/live/revision/`). Do not pay for 11–15, 21–25 or 29–30 on this service. Body 23’s latest Initialize ID selection also lacks a listed recipe. The pack retains these required types as unsupported interface examples.

For a chain recipe, make it possible to derive one ABI and one operation from the wording. Include the emitter address, stated as the contract that *emits* the logs ("Transfer value from 0x…" reads as the indexed `from` argument), complete event signature, indexed fields, decoded argument to aggregate and filter. A view comparison needs its call, return type, closing-block anchor and comparator. “Has this token been active?” supplies none of these.

For panel evidence, require sources that expose the necessary complete corpus. A source prefix and one host requirement restrict evidence provenance; they do not prove independence, completeness or historical accuracy. Two mirrors of the same endpoint are not two independent measurements. Guarded numeric bounds likewise restrict acceptable values without proving they are correct.

## Specify a real empty result separately from inability

A complete event scan with no logs can establish zero. An RPC timeout cannot. A successful reserve read can establish a zero reserve. Failure to retrieve it cannot. The pack's `missing` definition asks members to report inability rather than squeeze uncertainty into a typed sentinel.

Keep a state flag distinct from a retrieval failure. `24` encodes a successful `paused()` result as bytes32 integer 1 or 0; it never maps an RPC failure to 0. `11` and `12` allow a zero owner to represent renounced ownership; `13` reads the mutable USDC pauser role; it may be an EOA, so no code requirement is applied. `14`/`15` select the largest eligible inflow/outflow account and use a zero address only for a complete scan with no eligible activity. Their scalar addresses have no compatible ranking recipe (the listed recipe yields arrays). A zero-address deny guard must not contradict the selected getter’s valid return values.

Relative-window wording now states the duration and observation anchor so the free draft checker does not need an omitted `window` field to understand it. Finalized-block state is read once at that anchor, not repeatedly at moving latest blocks. Before a paid request, compare the actual quoted blocks with the requested observation; the draft service still defaults its separate window to 24 hours. For release facts (04/05), resolve the latest already-finalized block once and use its timestamp T for the completed UTC interval [T − 2592000 seconds, T). These rolling observations can trigger an upgrade review; they are no longer fixed September 2024 facts. Compare the actual quoted endpoint before paying; the checker omits the requested 720-hour window.

## Review one seam at a time

Apply the research report's controlled-test approach to the normalization contract. Before spending, review these cases with a small manually known corpus:

1. A record exactly at each boundary: lower included, upper excluded for the release interval; both endpoints included for the chain windows.
2. Two tied recipients: candidate discovery order must not decide the ranking.
3. Duplicate log delivery: the same `(blockHash, transactionHash, logIndex)` counts once.
4. A complete empty result versus one missing block: only the first may produce zero or an empty list.
5. A harmless question paraphrase: the normalized value should stay the same when definitions stay fixed.

Record the body hash, pinned blocks, source observations and expected normalized value. Keep structural validation, wording screening, seat agreement, deployer reproduction and consumer verification as separate assertions. In this project `results.json` contains only the free screening responses. The checker first sends the exact body; the current service rejects its extra fields, so it separately sends the documented draft fields with definitions appended to the question. The fallback does **not** validate guards, quorum, lifetime, consumer or the actual requested window. Its draft window may differ.

If a full body is refused, repair the named issue and screen again. Screening is a stochastic sample: identical bytes can receive different advice, and a proposed type can disagree even when suggestions are empty. Do not filter type advice out of the quality gate. Bytes32 call bodies ask for exact hexadecimal ABI data, and their consumers decode it; bytes32[] pool IDs are identifiers, not address lists. If a draft has `wording`, `not_answerable` or `answer_type` suggestions, revise and re-check even if blockers are empty. If a draft passes but evidence is inaccessible, change the evidence plan or task. If seats disagree, inspect whether the disagreement is in corpus selection, arithmetic or normalization before increasing tolerance. Leave `allowAmbiguous` unset unless you deliberately accept unresolved readings; disabling a screen cannot resolve them.
