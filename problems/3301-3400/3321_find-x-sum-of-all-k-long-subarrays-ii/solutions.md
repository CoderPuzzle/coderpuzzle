# Solutions — Find X-Sum of All K-Long Subarrays II

## Sliding window with a top-x set and its complement

At `n` up to `10⁵` the twin problem's per-window recount is no longer
affordable, but two slides differ by only two elements, so the frequency
table and the top-x selection can both move incrementally. Model every
distinct value as a `(count, value)` pair, ordered by count descending
with the value breaking ties. Keep exactly `min(x, distinct)` best pairs
in a TOP structure and everything else in a REST structure, plus a
running sum of the kept `count * value` products. Sliding the window
erases the leaving/entering elements' old pairs and places their new
pairs: a newcomer enters TOP when it beats TOP's worst element (the
displaced pair drops into REST), an erased TOP pair promotes REST's best
as its replacement, and a count that reaches zero leaves no pair at all.
Because every membership change flows through the same few moves, TOP
always holds the current top-x and the running sum is always the
window's x-sum — which also collapses to the plain window sum whenever
fewer than `x` distinct values exist, the stated special case.

The structures behind TOP and REST are two heaps of `(count, value)`
snapshots with lazy deletion: TOP is a min-heap (its peek is the worst
kept pair, the eviction candidate) and REST a max-heap (its peek is the
promotion candidate), with a membership table deciding whether a
snapshot is still truthful — stale snapshots are skipped on peek and
popped when they surface. Each slide does O(1) pushes and each pushed
snapshot is popped at most once, so the whole pass is O(n log n).
Sums reach `k * 10⁹ = 10¹⁴`, beyond 32-bit range, so every port
accumulates in 64-bit integers (JS/TS stay exact in `Number`, far below
`2⁵³`).

**Complexity:** `O(n log n)` time, `O(n)` space.
