# Solutions — Shortest Subarray With OR at Least K II

## Sliding window with per-bit counts

The key observation is that validity is closed in exactly the directions a
sliding window explores. If a subarray's OR reaches `k`, then every longer
subarray containing it also does — OR only accumulates bits — so for each
right end `r` the valid left ends form a prefix `[0 … L(r)]`, and growing
`r` to `r + 1` never decreases `L(r)` because the added suffix of the array
can only contribute more bits. Hence the shortest special window per `r` is
found by greedily advancing `l` while the current window still satisfies
`OR(l..r) ≥ k`, recording each length along the way, without `l` ever
needing to move backwards overall.

A sliding window normally undoes an operation when the left end advances,
but bitwise OR has no inverse: you cannot remove an element's bits from an
accumulated OR. Instead keep thirty counters — one per bit position —
holding how many elements currently inside the window set that bit. Adding
or removing an element increments or decrements one counter per set bit,
and the live window OR is rebuilt by collecting positions whose counter is
positive. Each element crosses the window boundary exactly once in each
direction, and the invariant holds automatically even when `k = 0`, thanks
to shrinking that stops at empty windows.

Every magnitude involved is bounded: constraints cap `nums[i]` and `k` at
10⁹, which is below `2³⁰`, so all counters, rebuilt OR values, and window
lengths fit comfortably in a signed 32-bit integer — and far under
JavaScript's exact-integer ceiling of `2⁵³`. After both pointer passes the
loop totals `O(30 · n)` elementary steps with thirty fixed counters of
extra space, independently of input contents.

**Complexity:** `O(n)` time, `O(1)` space.
