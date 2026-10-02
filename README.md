Experimental, commissioned as a test of the IMD swarm. It may not work as described. Read the code, start with small amounts, no warranty.

# imd-oracle-pack

30 ready `oracle.request` input bodies, five for each of `bool`, `uint256`, `address`, `address[]`, `bytes32` and `bytes32[]`, on chains **1, 8453 and 4663**. Examples cover chain recipes and panel evidence, relative windows, definitions, numeric bounds, source guards, denied values and ordered lists. Each body is its own JSON file; its one-line use case is in the [question catalog](questions/README.md). The [wording guide](GUIDE.md) builds on the existing oracle and Jobs:Research reports.

## Run

Install Node **20 or later**. There are no packages to install and no remote dependencies. Commands work from this directory:

```sh
npm run validate         # offline structural checks for every body
npm test                 # offline tests, with mocked HTTP/transport responses
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

The checker runs sequentially, waits at least 3 seconds between calls, and retries transport failures, malformed responses and HTTP 408/425/429/5xx up to **three times after the initial attempt**. Each fetch has a 30-second timeout, including response-body reading. Other HTTP failures and semantic blockers are recorded without retries. Exit 0 means every body or fallback draft received a `no_blockers` verdict; exit 1 means at least one did not or a local error prevented the run. Exit 0 never means a signed oracle answer exists.

Local validation covers documented field shapes and limits, with panel size 5–100 observed on 2 October 2026. It does not certify wording, recipe feasibility, chain support or data availability. The recorded run on 2 October 2026 (one uninterrupted `npm run check`) returned unknown-field rejections for all 30 exact bodies and no blockers for all 30 fallback drafts, but with non-blocking suggestions on 29 of them (all but body 02): `wording` on 26, `not_answerable` on 22 (every RPC-read panel body plus the two release questions) and `evidence` on 21 (the service proposes `evidence: chain` for every block-field panel body). Each result's `verdict` and `suggestions` fields list these codes; read the suggestion text in the raw response before spending. An earlier run blocked the first wording of body 21, which was then revised to an explicit historical block; that blocked response is not retained. The committed results are an observation, not independent assurance. Re-run the checker against the service before use; re-run the offline checks after edits.

## Sources, trust and operation

The [IMD API specification](https://imd.fun/docs/) was read on 2 October 2026, including Oracle body, chain recipe support and the shorter check schema. The [guide](GUIDE.md) links the two specific research reports it extends. The IMD address in chain-1 questions comes from the API docs. The Base WETH address is listed in [Uniswap's Base deployment table](https://developers.uniswap.org/docs/protocols/v3/deployments/v3-base-deployments). RPC endpoints are named in each panel body. Bytecode verification from this environment failed with HTTP 403, so the configured token addresses have **not been independently verified here**; confirm code and ABI on the intended chain before spending. Chain 4663 examples use blocks and transactions, without assuming a token deployment.

A person running the checker initiates each free HTTP call because they want admission feedback; it requires network access but no gas or payment. A future requester initiates and funds a paid oracle request to obtain a typed answer. Panel members must participate and, for chain evidence, the service must reproduce a supported recipe before attesting. This pack does not prove that those incentives cover costs or that seats/RPCs are available. A future consumer transaction also needs a caller willing to pay gas; nothing here schedules or executes it automatically. Panel answers trust the selected sources and agreement; chain answers additionally depend on RPC history, recipe reproduction and the attester. Check attestation version, signer, domain, pinned question, agreement and expiry in your consumer integration.

Commissioned through paid IMD swarm requests.
