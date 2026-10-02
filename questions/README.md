# Question catalog

Experimental, commissioned as a test of the IMD swarm. It may not work as described. Read the code, start with small amounts, no warranty.

Each linked JSON is a plain oracle.request input body; use cases stay here to avoid unknown API fields.

| Body | Type | Chain | Evidence | One-line use case |
|---|---|---|---|---|
| [01-imd-supply-positive.json](01-imd-supply-positive.json) | `bool` | 1 | chain | Gate a dashboard on a positive IMD supply. |
| [02-weth-supply-positive.json](02-weth-supply-positive.json) | `bool` | 8453 | chain | Gate a dashboard on a positive WETH supply. |
| [03-robinhood-block-activity.json](03-robinhood-block-activity.json) | `bool` | 4663 | chain | Detect user activity, ignoring the ArbOS internal transaction every block carries. |
| [04-go-ethereum-release.json](04-go-ethereum-release.json) | `bool` | 1 | panel | Trigger a historical release review for September 2024 UTC. |
| [05-node-release.json](05-node-release.json) | `bool` | 4663 | panel | Trigger a historical release review for September 2024 UTC. |
| [06-imd-transfer-count.json](06-imd-transfer-count.json) | `uint256` | 1 | chain | Measure IMD transfer event activity without counting transactions. |
| [07-weth-transfer-count.json](07-weth-transfer-count.json) | `uint256` | 8453 | chain | Measure WETH transfer event activity without counting transactions. |
| [08-imd-burn-sum.json](08-imd-burn-sum.json) | `uint256` | 1 | chain | Track event-defined IMD burns without confusing them with net supply change. |
| [09-robinhood-block-count.json](09-robinhood-block-count.json) | `uint256` | 4663 | chain | Size a Robinhood Chain backfill batch. |
| [10-robinhood-transaction-count.json](10-robinhood-transaction-count.json) | `uint256` | 4663 | chain | Measure Robinhood Chain transaction throughput. |
| [11-1-usdc-owner.json](11-1-usdc-owner.json) | `address` | 1 | chain | Compare the token administrator with a consumer-approved governance address. |
| [12-8453-usdc-owner.json](12-8453-usdc-owner.json) | `address` | 8453 | chain | Compare the token administrator with a consumer-approved governance address. |
| [13-1-pair-token0.json](13-1-pair-token0.json) | `address` | 1 | chain | Verify the asset ordering before interpreting pool reserves. |
| [14-1-pair-token1.json](14-1-pair-token1.json) | `address` | 1 | chain | Verify the asset ordering before interpreting pool reserves. |
| [15-1-dai-weth-pair.json](15-1-dai-weth-pair.json) | `address` | 1 | chain | Resolve the DAI/WETH liquidity venue before routing a swap. |
| [16-imd-recipient-rank.json](16-imd-recipient-rank.json) | `address[]` | 1 | chain | Rank gross token inflows rather than wallet wealth. |
| [17-weth-recipient-rank.json](17-weth-recipient-rank.json) | `address[]` | 8453 | chain | Rank gross token inflows rather than wallet wealth. |
| [18-4663-sender-rank.json](18-4663-sender-rank.json) | `address[]` | 4663 | chain | Identify active senders from a complete, bounded transaction corpus. |
| [19-8453-sender-rank.json](19-8453-sender-rank.json) | `address[]` | 8453 | chain | Identify active senders from a complete, bounded transaction corpus. |
| [20-1-imd-sender-value-rank.json](20-1-imd-sender-value-rank.json) | `address[]` | 1 | chain | Select high-outflow accounts for a contract monitoring list. |
| [21-1-weth-balance-word.json](21-1-weth-balance-word.json) | `bytes32` | 1 | chain | Compare a custody balance with the consumer minimum reserve. |
| [22-8453-weth-balance-word.json](22-8453-weth-balance-word.json) | `bytes32` | 8453 | chain | Compare a custody balance with the consumer minimum reserve. |
| [23-1-weth-allowance-word.json](23-1-weth-allowance-word.json) | `bytes32` | 1 | chain | Check whether a router allowance meets a required spend amount. |
| [24-1-usdc-paused-word.json](24-1-usdc-paused-word.json) | `bytes32` | 1 | chain | Disable a payment route when the underlying token is paused. |
| [25-8453-weth-supply-word.json](25-8453-weth-supply-word.json) | `bytes32` | 8453 | chain | Apply a consumer supply ceiling using a decoded bytes32 value. |
| [26-1-v4-volume-pools.json](26-1-v4-volume-pools.json) | `bytes32[]` | 1 | chain | Select liquid pools for a consumer routing shortlist. |
| [27-8453-v4-volume-pools.json](27-8453-v4-volume-pools.json) | `bytes32[]` | 8453 | chain | Select liquid pools for a consumer routing shortlist. |
| [28-1-v4-volume-pools.json](28-1-v4-volume-pools.json) | `bytes32[]` | 1 | chain | Select liquid pools for a consumer routing shortlist. |
| [29-1-usdc-weth-reserve-words.json](29-1-usdc-weth-reserve-words.json) | `bytes32[]` | 1 | chain | Check both pool reserves against minimum liquidity thresholds. |
| [30-1-dai-weth-reserve-words.json](30-1-dai-weth-reserve-words.json) | `bytes32[]` | 1 | chain | Check both pool reserves against minimum liquidity thresholds. |

Pattern audit (metric and selection rule, independent of chain or output encoding): supply 01/02/25; activity predicate 03; release publication 04/05; Transfer count 06/07; burn sum 08; block count 09; transaction count 10; contract owner 11/12; pair asset 13/14; pair lookup 15; recipient-value ranking 16/17; sender-frequency ranking 18/19; sender-value ranking 20; balance word 21/22; allowance word 23; pause word 24; v4-volume ranking 26/27/28; reserve-pair words 29/30. Maximum: three per pattern.
