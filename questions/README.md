# Question catalog

Experimental, commissioned as a test of the IMD swarm. It may not work as described. Read the code, start with small amounts, no warranty.

Each linked JSON is a plain oracle.request input body; use cases stay here to avoid unknown API fields.

| Body | Type | Chain | Evidence | One-line use case |
|---|---|---|---|---|
| [01-imd-supply-positive.json](01-imd-supply-positive.json) | `bool` | 1 | chain | Gate a dashboard on a positive IMD supply. |
| [02-weth-supply-positive.json](02-weth-supply-positive.json) | `bool` | 8453 | chain | Gate a dashboard on a positive WETH supply. |
| [03-robinhood-block-activity.json](03-robinhood-block-activity.json) | `bool` | 4663 | panel | Detect user activity, ignoring the ArbOS internal transaction every block carries. |
| [04-go-ethereum-release.json](04-go-ethereum-release.json) | `bool` | 1 | panel | Trigger a monthly release review from an explicit publication interval. |
| [05-node-release.json](05-node-release.json) | `bool` | 4663 | panel | Trigger a monthly release review from an explicit publication interval. |
| [06-imd-transfer-count.json](06-imd-transfer-count.json) | `uint256` | 1 | chain | Measure IMD transfer event activity without counting transactions. |
| [07-weth-transfer-count.json](07-weth-transfer-count.json) | `uint256` | 8453 | chain | Measure WETH transfer event activity without counting transactions. |
| [08-imd-burn-sum.json](08-imd-burn-sum.json) | `uint256` | 1 | chain | Track event-defined IMD burns without confusing them with net supply change. |
| [09-robinhood-block-count.json](09-robinhood-block-count.json) | `uint256` | 4663 | panel | Size a Robinhood Chain backfill batch. |
| [10-robinhood-transaction-count.json](10-robinhood-transaction-count.json) | `uint256` | 4663 | panel | Measure Robinhood Chain transaction throughput. |
| [11-1-closing-beneficiary.json](11-1-closing-beneficiary.json) | `address` | 1 | panel | Record the execution block beneficiary without inferring operator identity. |
| [12-8453-closing-beneficiary.json](12-8453-closing-beneficiary.json) | `address` | 8453 | panel | Confirm the miner field still holds the fee-vault predeploy constant (0x4200…0011). |
| [13-4663-closing-beneficiary.json](13-4663-closing-beneficiary.json) | `address` | 4663 | panel | Confirm the miner field still holds the sequencer placeholder constant (0xa4b0…6572). |
| [14-8453-first-sender.json](14-8453-first-sender.json) | `address` | 8453 | panel | Sample the first non-deposit (type ≠ 0x7e) transaction sender. |
| [15-4663-first-sender.json](15-4663-first-sender.json) | `address` | 4663 | panel | Sample the first non-ArbOS-internal (type ≠ 0x6a) transaction sender. |
| [16-imd-recipient-rank.json](16-imd-recipient-rank.json) | `address[]` | 1 | chain | Rank gross token inflows rather than wallet wealth. |
| [17-weth-recipient-rank.json](17-weth-recipient-rank.json) | `address[]` | 8453 | chain | Rank gross token inflows rather than wallet wealth. |
| [18-4663-sender-rank.json](18-4663-sender-rank.json) | `address[]` | 4663 | panel | Identify active senders from a complete, bounded transaction corpus. |
| [19-8453-sender-rank.json](19-8453-sender-rank.json) | `address[]` | 8453 | panel | Identify active senders from a complete, bounded transaction corpus. |
| [20-ethereum-beneficiary-rank.json](20-ethereum-beneficiary-rank.json) | `address[]` | 1 | panel | Summarize execution block beneficiary concentration. |
| [21-1-closing-hash.json](21-1-closing-hash.json) | `bytes32` | 1 | panel | Anchor an off-chain snapshot to an execution block. |
| [22-8453-closing-hash.json](22-8453-closing-hash.json) | `bytes32` | 8453 | panel | Anchor an off-chain snapshot to an execution block. |
| [23-4663-closing-hash.json](23-4663-closing-hash.json) | `bytes32` | 4663 | panel | Anchor an off-chain snapshot to an execution block. |
| [24-8453-closing-parent.json](24-8453-closing-parent.json) | `bytes32` | 8453 | panel | Link the snapshot anchor to its immediate predecessor. |
| [25-4663-closing-parent.json](25-4663-closing-parent.json) | `bytes32` | 4663 | panel | Link the snapshot anchor to its immediate predecessor. |
| [26-1-recent-block-hashes.json](26-1-recent-block-hashes.json) | `bytes32[]` | 1 | panel | Build an ordered three-block audit anchor. |
| [27-8453-recent-block-hashes.json](27-8453-recent-block-hashes.json) | `bytes32[]` | 8453 | panel | Build an ordered three-block audit anchor. |
| [28-4663-recent-block-hashes.json](28-4663-recent-block-hashes.json) | `bytes32[]` | 4663 | panel | Build an ordered three-block audit anchor. |
| [29-8453-closing-transaction-hashes.json](29-8453-closing-transaction-hashes.json) | `bytes32[]` | 8453 | panel | Select a repeatable transaction sample without sorting hashes. |
| [30-4663-closing-transaction-hashes.json](30-4663-closing-transaction-hashes.json) | `bytes32[]` | 4663 | panel | Select a repeatable transaction sample without sorting hashes. |
