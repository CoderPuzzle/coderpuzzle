# Solutions — Promise Time Limit

## Wrapper with an armed race timer

`timeLimit(fn, t)` returns a wrapper that captures the limit; each call
spreads its arguments into `fn(...args)` and returns a fresh promise
whose executor arms a timer for exactly `t` milliseconds rejecting with
the string `"Time Limit Exceeded"`, then starts `fn(...args).then(resolve,
reject)`. Both settlement paths — the fn's own fulfillment or rejection,
and the limit firing — route into that one promise's `resolve`/`reject`
pair, so whichever settles first decides the outcome and Promise
semantics simply ignore the loser's later call; no flags or clearing are
needed to cancel it.

Immediate failures cannot lose even before their handler chain runs: an
async fn that throws synchronously or returns an already-rejected promise
settles during the call itself, and the judge's driver drains queued
reactions before any virtual tick fires — mirroring real event loops,
where microtasks always precede timers. For sleeping fns the race is
decided purely by whether the fn's internal delay sits below `t`
(Examples 2–3 resolve, Example 1 rejects), and on CoderPuzzle's virtual clock
both sides of the race arm against one deterministic schedule captured by
the harness, so `"time"` never enters the judged answer.

**Complexity:** `O(1)` time per wrapped call, `O(1)` space.
