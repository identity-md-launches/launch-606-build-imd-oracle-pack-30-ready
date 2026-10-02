# Wording questions for panel agreement

Experimental, commissioned as a test of the IMD swarm. It may not work as described. Read the code, start with small amounts, no warranty.

This guide adds an **answer normalization contract** and a review procedure to two existing reports:

- [Oracle wording report: follower-list intersection](https://github.com/Identity-md/research/blob/main/jobs/f5bca911-0dbd-4128-b69c-7e979455009f/files/artifacts/report.md) (27 September 2026) reproduced ambiguity refusals and showed that admission does not establish data accessibility.
- [Designing Jobs:Research prompts](https://github.com/Identity-md/research/blob/main/jobs/3a780d65-516e-4be7-a565-d304f1c60998/files/artifacts/report.md) (25 September 2026) proposed controlled seams, observable assertions and repeated trials.

Those reports explain ambiguity and test design. The recommendations below apply their findings to a typed value that must match across seats. They are design recommendations, not measured claims that these 30 requests will reach quorum. Field limits and recipe support come from the [current API docs, Oracle body and Oracle sections](https://imd.fun/docs/).

## Start with the value your consumer can safely use

Write a sentence describing the consumer's decision before choosing the metric. A supply-positive boolean can enable a display; it cannot establish solvency. A gross inflow ranking can select research candidates; it cannot establish wallet wealth or human popularity. Name what the answer establishes so a correct panel answer does not become an incorrect product decision.

Then write the normalization contract: entity, observation anchor, complete input corpus, operation, units, order, tie rule and failure condition. Different seats should obtain the same value even if they find evidence in a different order. Put this contract in `definitions`, using short named entries under the 512-character value limit. Keep the central operation and entity in `question` too.

For example, `04` asks about release publication during a fixed calendar interval. Its `window.hours` does not redefine that interval. `01` asks about a view call at the closing block. It does not ask whether the predicate was true at any point in the window. Mixing these two interpretations is a common way to produce honest disagreement.

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
| `bytes32` | Block hash, transaction hash, pool ID or another named 32-byte field |
| `bytes32[]` | Selection rule and order; do not alphabetically sort a transaction-index sample |

Consider `16`, the IMD recipient ranking. “Top recipients” is insufficient: a panel could rank net balances, transfer counts or gross incoming value. The body chooses summed raw `Transfer.value`, excludes the zero recipient, requires positive totals, and breaks ties numerically. An address casing difference must not change numeric order. It does not merge addresses into supposed people.

For `29`, reordering hashes changes the answer because transaction index order is the metric. For `26`, reversing the newest-first order changes the answer. `head: 3` governs agreement on leading entries; it does not invent missing entries. This pack requests up to three entries. Confirm live short-list handling before relying on sparse-window answers; never pad a list with zero hashes to satisfy a length expectation.

Use `toleranceBps` only after establishing identical units and rounding. It is not a remedy for different definitions. Counts and raw event sums in this pack use zero tolerance. A tolerable numerical error also needs a consumer-side rationale: an answer near a liquidation or payout boundary is different from an approximate dashboard count.

## Choose evidence by reproducibility, not by subject matter

The documented chain recipe set supports call comparisons, log sums/counts, rankings and v4-specific calculations. It does not list a scalar block-hash or scalar address recipe. This pack therefore labels block-field questions `panel`, even though their sources are RPC responses. Panel evidence has no documented deployer rerun. A source URL guard cannot turn it into one.

For a chain recipe, make it possible to derive one ABI and one operation from the wording. Include the emitter address, complete event signature, indexed fields, decoded argument to aggregate and filter. A view comparison needs its call, return type, closing-block anchor and comparator. “Has this token been active?” supplies none of these.

For panel evidence, require sources that expose the necessary complete corpus. A source prefix and one host requirement restrict evidence provenance; they do not prove independence, completeness or historical accuracy. Two mirrors of the same endpoint are not two independent measurements. Guarded numeric bounds likewise restrict acceptable values without proving they are correct.

## Specify a real empty result separately from inability

A complete event scan with no logs can establish zero. An RPC timeout cannot. A retrieved empty closing block can establish the empty transaction sample. Failure to retrieve it cannot. The pack's `missing` definition asks members to report inability rather than squeeze uncertainty into a typed sentinel.

`14` and `15` deliberately reserve the zero address for a successfully retrieved block with no transactions. This sentinel is part of their consumer semantics, not a universal failure convention. Do not add a zero-address deny guard to those bodies. Similarly, demanding contract code for a block beneficiary or EOA sender would contradict the metric. This pack sets `mustHaveCode: false` on those scalar addresses; a protocol-selection question could legitimately require true.

## Review one seam at a time

Apply the research report's controlled-test approach to the normalization contract. Before spending, review these cases with a small manually known corpus:

1. A record exactly at each boundary: lower included, upper excluded for the release interval; both endpoints included for the chain windows.
2. Two tied recipients: candidate discovery order must not decide the ranking.
3. Duplicate log delivery: the same `(blockHash, transactionHash, logIndex)` counts once.
4. A complete empty result versus one missing block: only the first may produce zero or an empty list.
5. A harmless question paraphrase: the normalized value should stay the same when definitions stay fixed.

Record the body hash, pinned blocks, source observations and expected normalized value. Keep structural validation, wording screening, seat agreement, deployer reproduction and consumer verification as separate assertions. In this project `results.json` contains only the free screening responses. The checker first sends the exact body; the current service rejects its extra fields, so it separately sends the documented draft fields with definitions appended to the question. The fallback does **not** validate guards, quorum, lifetime, consumer or the actual requested window. Its draft window may differ.

If a full body is refused, repair the named issue and screen again. If a draft passes but evidence is inaccessible, change the evidence plan or task. If seats disagree, inspect whether the disagreement is in corpus selection, arithmetic or normalization before increasing tolerance. Leave `allowAmbiguous` unset unless you deliberately accept unresolved readings; disabling a screen cannot resolve them.
