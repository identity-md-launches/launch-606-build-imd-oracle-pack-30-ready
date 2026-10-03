# Question catalog

Experimental, commissioned as a test of the IMD swarm. It may not work as described. Read the code, start with small amounts, no warranty.

Each linked JSON is a plain oracle.request input example; use cases stay here to avoid unknown API fields. Every body now matches a documented live chain recipe type: `call-compare` yields `bool`, log sums and counts yield `uint256`, and rankings yield `address[]` or `bytes32[]`. The draft check is run on the bare question, with no definitions pasted into it.

| Body | Type | Chain | Evidence | One-line use case |
|---|---|---|---|---|
| [01-1-v3-weth-balance-floor.json](01-1-v3-weth-balance-floor.json) | `bool` | 1 | chain | Gate a mainnet route on the Uniswap v3 USDC/WETH pool holding at least 10,000 WETH. |
| [02-8453-weth-pool-balance-floor.json](02-8453-weth-pool-balance-floor.json) | `bool` | 8453 | chain | Gate a Base route on the Uniswap USDC/WETH pool holding at least 500 WETH. |
| [03-robinhood-block-activity.json](03-robinhood-block-activity.json) | `bool` | 4663 | chain | Detect user activity, ignoring the ArbOS internal transaction every block carries. |
| [04-go-ethereum-release.json](04-go-ethereum-release.json) | `bool` | 1 | panel | Trigger an upgrade review after a stable release in the trailing 30 days. |
| [05-node-release.json](05-node-release.json) | `bool` | 4663 | panel | Trigger an upgrade review after a stable release in the trailing 30 days. |
| [06-imd-transfer-count.json](06-imd-transfer-count.json) | `uint256` | 1 | chain | Measure IMD transfer event activity without counting transactions. |
| [07-weth-transfer-count.json](07-weth-transfer-count.json) | `uint256` | 8453 | chain | Measure WETH transfer event activity without counting transactions. |
| [08-imd-burn-sum.json](08-imd-burn-sum.json) | `uint256` | 1 | chain | Track event-defined IMD burns without confusing them with net supply change. |
| [09-8453-v4-native-pool-count.json](09-8453-v4-native-pool-count.json) | `uint256` | 8453 | chain | Detect new native-ETH Uniswap v4 pools on Base for a consumer venue registry. |
| [10-8453-usdc-transfer-count.json](10-8453-usdc-transfer-count.json) | `uint256` | 8453 | chain | Measure Base USDC transfer activity by log count, not by transactions. |
| [11-1-usdc-paused.json](11-1-usdc-paused.json) | `bool` | 1 | chain | Disable a payment route while mainnet USDC is paused. |
| [12-8453-usdc-paused.json](12-8453-usdc-paused.json) | `bool` | 8453 | chain | Disable a payment route while Base USDC is paused. |
| [13-1-usdc-blacklist-count.json](13-1-usdc-blacklist-count.json) | `uint256` | 1 | chain | Trigger a compliance review when USDC blacklisting is being used heavily. |
| [14-1-weth-deposit-sum.json](14-1-weth-deposit-sum.json) | `uint256` | 1 | chain | Size recent ETH-wrapping demand for a liquidity or gas-reserve top-up. |
| [15-1-weth-withdrawal-sum.json](15-1-weth-withdrawal-sum.json) | `uint256` | 1 | chain | Size recent WETH-unwrapping outflow for a liquidity or gas-reserve top-up. |
| [16-imd-recipient-rank.json](16-imd-recipient-rank.json) | `address[]` | 1 | chain | Rank gross token inflows rather than wallet wealth. |
| [17-weth-recipient-rank.json](17-weth-recipient-rank.json) | `address[]` | 8453 | chain | Rank gross token inflows rather than wallet wealth. |
| [18-4663-sender-rank.json](18-4663-sender-rank.json) | `address[]` | 4663 | chain | Identify active senders from a complete, bounded transaction corpus. |
| [19-8453-sender-rank.json](19-8453-sender-rank.json) | `address[]` | 8453 | chain | Identify active senders from a complete, bounded transaction corpus. |
| [20-1-imd-sender-value-rank.json](20-1-imd-sender-value-rank.json) | `address[]` | 1 | chain | Select high-outflow accounts for a contract monitoring list. |
| [21-1-v2-weth-balance-floor.json](21-1-v2-weth-balance-floor.json) | `bool` | 1 | chain | Gate a mainnet route on the Uniswap v2 USDC/WETH pair holding at least 1,000 WETH. |
| [22-8453-weth-deposit-count.json](22-8453-weth-deposit-count.json) | `uint256` | 8453 | chain | Measure WETH wrapping activity on Base by log count. |
| [23-1-v4-native-pool-count.json](23-1-v4-native-pool-count.json) | `uint256` | 1 | chain | Detect new native-ETH Uniswap v4 pools on mainnet for a consumer venue registry. |
| [24-1-weth-depositor-rank.json](24-1-weth-depositor-rank.json) | `address[]` | 1 | chain | Select the largest ETH wrappers for a contract monitoring list. |
| [25-8453-usdc-transfer-sum.json](25-8453-usdc-transfer-sum.json) | `uint256` | 8453 | chain | Measure gross USDC transfer volume on Base. |
| [26-1-v4-wbtc-volume-pools.json](26-1-v4-wbtc-volume-pools.json) | `bytes32[]` | 1 | chain | Select liquid WBTC pools for a consumer routing shortlist. |
| [27-8453-v4-volume-pools.json](27-8453-v4-volume-pools.json) | `bytes32[]` | 8453 | chain | Select liquid WETH pools for a consumer routing shortlist. |
| [28-8453-v4-usdc-volume-pools.json](28-8453-v4-usdc-volume-pools.json) | `bytes32[]` | 8453 | chain | Select liquid USDC pools for a consumer routing shortlist. |
| [29-8453-usdc-sender-value-rank.json](29-8453-usdc-sender-value-rank.json) | `address[]` | 8453 | chain | Select high-outflow USDC accounts on Base for a contract monitoring list. |
| [30-1-weth-withdrawer-rank.json](30-1-weth-withdrawer-rank.json) | `address[]` | 1 | chain | Select the largest WETH unwrappers for a contract monitoring list. |

Pattern audit (metric and selection rule, independent of chain): balance floor 01/02/21; activity predicate 03; release publication 04/05; Transfer count 06/07/10; burn sum 08; native-pool Initialize count 09/23; USDC pause flag 11/12; blacklist count 13; WETH deposit sum 14; WETH withdrawal sum 15; recipient-value ranking 16/17; sender-frequency ranking 18/19; sender-value ranking 20/29; WETH deposit count 22; depositor ranking 24; USDC transfer sum 25; v4-volume ranking 26/27/28; withdrawer ranking 30. Maximum: three per pattern.
