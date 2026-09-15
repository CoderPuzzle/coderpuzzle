# Solutions — Parallel Execution of Promises for Individual Results Retrieval

## Pending Counter with Positional Writes

Preallocate a results array of length `n` and a pending counter starting at
`n`. Call every function immediately — so all promises start running in
parallel — and attach both a fulfillment and a rejection handler to each
returned promise in that same synchronous pass. A fulfillment writes
`{status: "fulfilled", value}` at its own index; a rejection writes
`{status: "rejected", reason}` there instead. Each settlement decrements
the counter, and whichever settlement brings it to zero resolves the
aggregate with the results array; an empty input short-circuits to `[]`
before any waiting happens.

Because every promise receives its rejection handler up front, each
rejection is caught individually the moment it happens and can never escape
as an unhandled failure, while the aggregate itself only ever resolves —
Example 3's rejected second promise simply lands as
`{"status":"rejected","reason":"Error"}` at index 1 and the returned
promise still fulfills. Writes are keyed by index rather than by arrival
order, so the order in which promises settle is irrelevant: the aggregate
resolves exactly when the slowest one settles, at which point every slot is
filled, and never earlier. The built-in `Promise.allSettled()` is nowhere in
sight.

**Complexity:** `O(n)` time, `O(n)` space, where `n` is
`functions.length`.
