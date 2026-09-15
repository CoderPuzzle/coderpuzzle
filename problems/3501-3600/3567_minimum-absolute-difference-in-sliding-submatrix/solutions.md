# Solutions — Minimum Absolute Difference in Sliding Submatrix

## Sort each window, take the smallest adjacent gap

Absolute differences are easiest to minimize on sorted data: once a window's
`k * k` values are lined up in ascending order, the closest pair of values in
that window must appear in adjacent positions of the sorted order. So the
answer for a window is simply the smallest difference between neighboring
entries of its sorted value list. Equal values land next to each other and
contribute a gap of `0`, which is exactly the answer the statement prescribes
when a window's elements are not all distinct, and a `k == 1` window contains
a single value with no pair at all, which the `0` default covers.

The code slides the window over every valid top-left corner `(i, j)`, gathers
its `k * k` cells into one buffer, sorts that buffer, and scans once for the
minimum adjacent gap. With `m, n <= 30` there are at most `29 * 29 = 841`
windows of at most `30 * 30 = 900` values, so this direct recomputation per
window is only a few million comparisons in total — no per-value position
lists or incremental window maintenance are needed at this scale.

**Complexity:** `O((m - k + 1) * (n - k + 1) * k² log k)` time, `O(k²)` space.
