Experimental, commissioned as a test of the IMD swarm. It may not work as described. Read the code, start with small amounts, no warranty.

# imd-oracle-pack

30 ready `oracle.request` input bodies, five for each of `bool`, `uint256`, `address`, `address[]`, `bytes32` and `bytes32[]`, on chains **1, 8453 and 4663**. Examples cover chain recipes and panel evidence, relative windows, definitions, numeric bounds, source guards, denied values and ordered lists. Each body is its own JSON file; its one-line use case is in the [question catalog](questions/README.md). The [wording guide](GUIDE.md) builds on the existing oracle and Jobs:Research reports.

## Run

Install Node **20 or later**. There are no packages to install and no remote dependencies. Commands work from this directory:

```sh
npm run validate         # offline structural checks for every body
npm test                 # offline tests, with live-response fixtures and injected failures
npm run check            # free POST checks; writes results.json progressively
node scripts/check.mjs --help
node scripts/check.mjs --output /tmp/imd-check-results.json
```

Open [index.html](index.html) in a browser for the static catalog. It needs no build, server, CDN or network; links open the local JSON and Markdown files. The README and guide are easiest to read in a Markdown viewer.

## Use a body

JSON files contain only the Oracle body, not an `action` wrapper or catalog metadata. For a check, the script wraps each body as `{ "action": "oracle.request", "input": BODY }`. For a future paid quote, the documented envelope additionally needs a generated `requestKey`. This project never creates quotes, signs payments, submits paid requests or deploys a consumer.

Read the question and definitions before adapting it. Relative windows become exact blocks at quote time; repeated runs are new observations. Set your actual `consumer` domain when integrating a verifying contract; none is invented in this pack. Guards constrain acceptable values, not truth. Source guards, head agreement and code requirements must fit the metric. Requests can fail or disagree even after successful screening.

## What the checker records

The free [POST /requests/check](https://imd.fun/docs/) currently accepts a shorter draft input and rejects full oracle bodies with unknown fields. The script sends **every exact body first**, records that response, then on that specific rejection checks the documented draft projection. Definitions are appended to the draft question within the 2,000-character limit. Guard fields and other omitted fields are recorded explicitly; the service's drafted window is not the body's requested window. A successful fallback is not validation of the full body.

`results.json` records UTC attempt dates, HTTP status, raw parsed response (or response text), verdict, non-blocking suggestion codes, SHA-256 of the JSON file bytes, fallback input and omitted fields. Verdicts distinguish blockers, no blockers, unclassified responses, HTTP errors and network unreachability. A timeout or transport error includes its reason. A run overwrites the report with an atomic progressive snapshot; choose `--output` to retain an earlier run. A partial report has `completedAt: null` and only finished entries.

The checker runs sequentially, waits at least 3 seconds between calls, and retries transport failures, malformed responses and HTTP 408/425/429/5xx up to **three times after the initial attempt**. Each fetch has a 30-second timeout, including response-body reading. Other HTTP failures and semantic blockers are recorded without retries. Exit 0 means every body or fallback draft was judged, received a `no_blockers` verdict, and had neither `wording` nor `not_answerable` suggestions; exit 1 means at least one failed this gate or a local error prevented the run. Exit 0 never means a signed oracle answer exists.

Local validation covers documented field shapes and limits, with panel size 5–100 observed on 2 October 2026. The revised run in `results.json` records all 30 exact-body rejections and their separate live draft checks. All 30 drafts have no blockers and no `wording` or `not_answerable` suggestions. Bodies 11–15 and 20–30 now ask for contract state, asset lookup, balances, allowances, pause state, supply, or liquidity metrics. The catalog includes a pattern audit; no pattern appears more than three times.

Live GET response bodies (API health, version, oracle examples and documentation), initial wording probes and final POST responses are retained in [test/live](test/live/). The offline fixture replay uses these responses; simulated transport failures remain explicit fault-injection tests. These observations do not establish seat agreement or a signed answer. Re-run the checker before use and the offline checks after edits.

## Sources, trust and operation

The [IMD API specification](https://imd.fun/docs/) was read on 2 October 2026, including Oracle body, chain recipe support and the shorter check schema. The [guide](GUIDE.md) links the two specific research reports it extends. The IMD address in chain-1 questions comes from the API docs. The Base WETH address is listed in [Uniswap's Base deployment table](https://developers.uniswap.org/docs/protocols/v3/deployments/v3-base-deployments). RPC endpoints remain named in transaction-data bodies. The new examples use deployed USDC, WETH and Uniswap contract addresses; their bytecode and historical calls have not been independently executed here. Confirm code, ABI and archive access before spending. Chain 4663 examples retain activity and throughput metrics without assuming a token deployment.

The live documentation lists `call-compare`, event aggregation/ranking and v4 recipes, but no scalar `address` or `bytes32` recipe or reserve-word tuple recipe. Bodies 11–15, 21–25 and 29–30 preserve the pack's required answer types and correctly identify their evidence as `chain`; clean draft screening does **not** establish that the current attester can reproduce them. The transaction/block metrics in 03, 09, 10, 18 and 19 also lack a listed recipe. Do not treat these as proven executable paid requests.

For example, [21](questions/21-1-weth-balance-word.json) returns a custody balance as a big-endian 32-byte integer word; a consumer can decode it and apply a reserve threshold. [26](questions/26-1-v4-volume-pools.json) returns pool IDs ranked by token-specific swap volume. [29](questions/29-1-usdc-weth-reserve-words.json) returns exactly two reserve words in token0/token1 order, not hashes.

A person running the checker initiates each free HTTP call because they want admission feedback; it requires network access but no gas or payment. A future requester initiates and funds a paid oracle request to obtain a typed answer. Panel members must participate and, for chain evidence, the service must reproduce a supported recipe before attesting. This pack does not prove that those incentives cover costs or that seats/RPCs are available. A future consumer transaction also needs a caller willing to pay gas; nothing here schedules or executes it automatically. Panel answers trust the selected sources and agreement; chain answers additionally depend on RPC history, recipe reproduction and the attester. Check attestation version, signer, domain, pinned question, agreement and expiry in your consumer integration.

Commissioned through paid IMD swarm requests.
