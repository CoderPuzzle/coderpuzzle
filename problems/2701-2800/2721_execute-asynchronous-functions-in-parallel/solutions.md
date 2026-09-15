# Solutions — Execute Asynchronous Functions in Parallel

## Pending Counter with Index Writes and First-Rejection Settlement

Call every function immediately, so all promises start running in
parallel, and in that same synchronous pass attach both a fulfillment and
a rejection handler to each returned promise. Preallocate a results array
of length `n` plus a pending counter starting at `n`. A fulfillment writes
its value at the promise's own index — never at a shared write position —
so settlement order can never shuffle the resolved array; then it
decrements the counter and resolves the aggregate with the results array
when the counter hits zero. The very first rejection simply calls
`reject` on the aggregate: since a promise settles at most once, every
later settlement attempt (resolve or reject) is automatically a no-op,
which is exactly the required "first rejection wins" semantics without
any extra bookkeeping. An empty input short-circuits to `[]` before any
waiting happens.

Because each individual promise receives its rejection handler up front,
a rejected function is caught the moment it rejects instead of escaping
as an unhandled failure, while rejection of the aggregate itself happens
on demand — Example 2's promise rejecting at 100ms settles the returned
promise with `"Error"` even though the other function is still pending.
The aggregate resolves only after every function has settled, so its
resolution moment is the maximum delay across all promises (Example 3's
150ms), and the values line up by original index regardless of the order
in which the promises actually settled. The built-in `Promise.all()` is
nowhere in sight.

**Complexity:** `O(n)` time and `O(n)` space, where `n` is
`functions.length`.
