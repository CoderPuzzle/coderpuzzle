# Solutions — Memoize

## Serialize the arguments, cache by key

The wrapper closes over one Map and answers before touching `fn`: the
arguments array is serialized in order (JSON.stringify of the spread
array) into a string key, a miss runs through to the real function and
stores its result, and any hit returns the stored value directly. The
statement's sum subtlety — `(2,3)` and `(3,2)` must stay separate calls —
falls out of serialization order without extra logic, while equal pairs
hash identically and never recount.

Because the underlying function only ever sees a given argument tuple
once, the driver's call counter climbs exactly with the number of
distinct tuples played so far; every `getCallCount` row reads back that
monotone count. Repeats return their cached value without perturbing it,
so interleaved call/count scripts reproduce both series independently.

**Complexity:** `O(1)` amortized time per action, `O(k)` space for `k`
distinct argument tuples.
