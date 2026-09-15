# Solutions — Maximum Number of Intersections on the Chart

## Sweep the heights in half-units

The intersection count only changes when the line passes a vertex height,
so the search space collapses to the distinct values of `y`: just above `v`
(every segment with `lo <= v < hi` is crossed strictly) and exactly at `v`.
At a vertex height each strictly spanning segment still adds one interior
crossing, and every vertex lying on the line adds exactly one point however
many incident segments touch it there — that per-vertex merge is what makes
integer levels competitive.

Difference arrays over the compressed heights record both counts: each
segment contributes over its half-level range `[lo, hi - 1]` and its strict
interior `[lo + 1, hi - 1]`, and one prefix-sum pass takes the maximum of
the two candidates per level. The integer term is not a technicality — for
`[2,3,2,1,2]` every half-level sees two crossings while the level `2`
touches three vertices and wins with three.

**Complexity:** `O(n log n)` time, `O(n)` space.
