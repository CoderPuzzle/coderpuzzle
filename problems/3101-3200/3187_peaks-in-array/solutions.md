# Solutions — Peaks in Array

## Fenwick tree over peak indicators

Collapse the array to a 0/1 indicator p[i], which is 1 exactly when i is an interior index with nums[i] strictly greater than both neighbors. A count query [l, r] is then just a range sum over the open interior (l + 1 .. r - 1), because the endpoints of the queried subarray can never be peaks; windows shorter than three elements have no interior at all and return 0. Sums over a fixed 0/1 array with interleaved point reassignments is exactly what a Fenwick tree does in logarithmic time per operation.

The tree is built by adding 1 at every initially peaking index. An assignment nums[idx] = val can only change the peak status of idx - 1, idx, and idx + 1 — the comparison partners of the written cell — so the update removes the old indicator contributions of those three positions, writes the value, and re-adds the indicators recomputed from the new array. Each of the six adjustments is an O(log n) Fenwick add, and is_peak guards the boundary indices 0 and n - 1, which can never be peaks.

Note the code mutates nums in place during updates so that subsequent queries and updates observe the current array, while reads of is_peak before and after the write see the correct old and new states. This keeps every query and update exact under arbitrarily interleaved operations.

**Complexity:** `O((n + q) log n)` time, `O(n)` space.
