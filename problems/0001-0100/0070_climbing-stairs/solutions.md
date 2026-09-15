# Solutions — Climbing Stairs

## Two-variable iteration

Every way of standing on step `i` ends with the same kind of final move: a single step up from `i-1`, or a double step from `i-2`. Those two groups are disjoint (the final move differs) and exhaustive (only 1-step and 2-step moves exist), so the count for `i` is the sum of the counts for `i-1` and `i-2` — the Fibonacci recurrence, seeded with `ways(1) = 1` and `ways(2) = 2`.

Because the recurrence only ever looks two steps back, a full memo table is unnecessary: two rolling variables carry `ways(i-1)` and `ways(i-2)` upward, and each loop iteration shifts them once and adds them together. No recursion, no array, and no recursion-depth limit to worry about.

With `n <= 45` the answer peaks at 1,836,311,903, just inside the 32-bit integer the input and return are declared as, so every fixed-width port accumulates without widening.

**Complexity:** `O(n)` time, `O(1)` space.
