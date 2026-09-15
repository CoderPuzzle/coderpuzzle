# Solutions — Maximum Number of Potholes That Can Be Fixed

## Take longest blocks first, then partial-drain one more

Splitting `road` on smooth stretches yields maximal runs of potholes, and any
set of repairs decomposes into disjoint purchased segments, one per run (or
partial run) touched. A purchase of `m` consecutive potholes costs `m + 1`,
so the total cost of fixing `P` potholes across `s` distinct segments is
exactly `P + s`: long runs are the cheapest per pothole because their
overhead of one extra unit per segment is amortized over more potholes.
Sorting the run lengths in descending order therefore spends every whole
segment purchase where its fixed overhead works hardest — take each full run
while `budget` still covers `length + 1`.

When some remaining run no longer fits completely, spending more whole
segments only adds overhead without length advantage, so the optimal last
move drains a single partial prefix: with `b` budget left, a purchase costs
`m + 1`, so at most `min(length, b - 1)` further potholes come out of one
more segment. That is why the loop adds `max(0, budget - 1)` and stops — no
additional run can ever beat it, since every later run in the sorted order is
shorter or equal.

**Complexity:** `O(n log n)` time, `O(n)` space (`n = road.length`; the scan
is linear once the runs are sorted).
