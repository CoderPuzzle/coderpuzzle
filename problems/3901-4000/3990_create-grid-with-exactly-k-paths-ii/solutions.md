# Solutions — Create Grid With Exactly K Paths II

## Binary shunt chain into a collector column

Every `k` in range is buildable, so an empty array is never returned. The grid
carries a chain of open 2 x 2 "doublers": doubler `d` occupies rows
`(2d-2, 2d-1)` and columns `(2d, 2d+1)`, so exactly `2^d` monotone paths reach
its exit, and consecutive doublers are joined by a forced one-path connector
(the right-then-down alternative cell stays blocked). Let `e` be the highest
set bit of `k`; the chain stops after doubler `e`, so `2^e` paths arrive at
its exit.

Each lower set bit `b` contributes `2^b` independently: a shunt corridor
leaves doubler `(b+1)`'s top-right (a cell already carrying exactly `2^b`
paths), runs right across a one-column obstacle guard, and merges into the
collector column at the right edge. The leading bit's `2^e` paths leave the
chain exit one row below every other shunt and run right into the same
collector, which descends to the bottom-right cell. Shunts merge additively,
so the total is exactly `sum of 2^b over set bits = k`. The board is
`(2e+1) x (2e+4)` — at most 19 x 22 for `k <= 1000`, inside the 25 x 25
limit.

**Complexity:** `O(e^2)` time and space for `e = floor(log2 k)` (at most ~400
cells touched), well within limits.
