Experimental, commissioned as a test of the IMD swarm. It may not work as described. Read the code, start with small amounts, no warranty.

# imd-oracle-pack

30 experimental `oracle.request` input examples, each typed to a live chain recipe (`bool`, `uint256`, `address[]` or `bytes32[]`), on chains **1, 8453 and 4663**. Examples cover chain recipes and panel evidence, relative windows, definitions, numeric bounds, source guards, denied values and ordered lists. Each body is its own JSON file; its one-line use case is in the [question catalog](questions/README.md). The [wording guide](GUIDE.md) builds on the existing oracle and Jobs:Research reports.

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

The free [POST /requests/check](https://imd.fun/docs/) currently accepts a shorter draft input and rejects full oracle bodies with unknown fields. The script sends **every exact body first**, records that response, then on that specific rejection checks the documented draft projection. The draft carries the bare question only; definitions are not pasted into it, so the question must stand alone. Guard fields and other omitted fields are recorded explicitly; the service's drafted window is not the body's requested window. A successful fallback is not validation of the full body.

`results.json` records UTC attempt dates, HTTP status, raw parsed response (or response text), verdict, non-blocking suggestion codes, SHA-256 of the JSON file bytes, fallback input and omitted fields. Verdicts distinguish blockers, no blockers, unclassified responses, HTTP errors and network unreachability. A timeout or transport error includes its reason. A run overwrites the report with an atomic progressive snapshot; choose `--output` to retain an earlier run. A partial report has `completedAt: null` and only finished entries.

The checker runs sequentially, waits at least 3 seconds between calls, and retries transport failures, malformed responses and HTTP 408/425/429/5xx up to **three times after the initial attempt**. Each fetch has a 30-second timeout, including response-body reading. Other HTTP failures and semantic blockers are recorded without retries. Exit 0 means every body or fallback draft was judged, received a `no_blockers` verdict, and had no `wording`, `not_answerable` or `answer_type` suggestions; exit 1 means at least one failed this gate or a local error prevented the run. Exit 0 never means a signed oracle answer exists.

Local validation covers documented field shapes and limits, with panel size 5–100 observed on 2 October 2026. The revised run in `results.json` records all 30 exact-body rejections and their separate live draft checks. The saved final responses are samples, not a promise that identical drafts will receive identical advice later. Bodies 11–15, 21–25 and 29–30 were retyped to documented recipe types, and 01/02 (a positive-supply check) were replaced by balance floors. Type advice fails the gate even though the service calls it non-blocking. The catalog includes a pattern audit; no pattern appears more than three times.

Live GET response bodies (API health, version, oracle examples and documentation), initial wording probes and final POST responses are retained in [test/live](test/live/). The offline fixture replay uses these responses; simulated transport failures remain explicit fault-injection tests. These observations do not establish seat agreement or a signed answer. Re-run the checker before use and the offline checks after edits.

## Sources, trust and operation

The [IMD API specification](https://imd.fun/docs/) was read on 2 October 2026, including Oracle body, chain recipe support and the shorter check schema. The [guide](GUIDE.md) links the two specific research reports it extends. The IMD address in chain-1 questions comes from the API docs. The Base WETH address is listed in [Uniswap's Base deployment table](https://developers.uniswap.org/docs/protocols/v3/deployments/v3-base-deployments). RPC endpoints remain named in transaction-data bodies. The examples use USDC, WETH, WBTC and Uniswap contract addresses. The Base balance holder is the [Uniswap USDC/WETH pool](https://app.uniswap.org/explore/pools/base/0xd0b53D9277642d899DF5C87A3966A349A798F224), rather than the L2 bridge predeploy. The pause and blacklist questions follow [Circle’s token design](https://github.com/circlefin/stablecoin-evm/blob/master/doc/tokendesign.md). Direct RPC verification was attempted but returned HTTP 403 from this environment; it is recorded rather than claimed successful. Confirm code, ABI and archive access before spending. Chain 4663 examples retain activity and throughput metrics without assuming a token deployment.

**Recipe types.** The retrieved docs list `call-compare` (yields `bool`), `log-sum` and `log-count` (`uint256`), `log-rank` and `v4-volume-rank` (arrays). No recipe yields a scalar `address` or `bytes32`, and a saved paid scalar request ended `mismatch` with `recipe yields bool, request asks for uint256` (live [IMD supply request](https://api.imd.fun/oracle/requests/b23e854e-6ead-4ff8-8ba4-3b6bfdcb0fb9?members=0) and [WETH decimals request](https://api.imd.fun/oracle/requests/01a65559-803f-4e36-9a0a-1f8e1988dcb6?members=0); saved in [test/live/revision](test/live/revision/)). So the 12 bodies that were typed that way (11–15, 21–25, 29–30) were replaced or retyped: view-call checks answer `bool` (11, 12, 21), event sums and counts answer `uint256` (13, 14, 15, 22, 23, 25) and rankings answer `address[]` (24, 29, 30). The pack therefore has no scalar `address` or `bytes32` body. Each body's type equals the type the live free check proposed for its bare question in the final run (`test/live/bare/final-bare-checks.json`). No paid request was submitted, so none of this is a claim that a panel will attest. The block and transaction scans in 03, 18 and 19 still have no listed recipe; they are unchanged and remain a limitation.

A person running the checker initiates each free HTTP call because they want admission feedback; it requires network access but no gas or payment. A future requester initiates and funds a paid oracle request to obtain a typed answer. Panel members must participate and, for chain evidence, the service must reproduce a supported recipe before attesting. This pack does not prove that those incentives cover costs or that seats/RPCs are available. A future consumer transaction also needs a caller willing to pay gas; nothing here schedules or executes it automatically. Panel answers trust the selected sources and agreement; chain answers additionally depend on RPC history, recipe reproduction and the attester. Check attestation version, signer, domain, pinned question, agreement and expiry in your consumer integration.

Commissioned through paid IMD swarm requests.
