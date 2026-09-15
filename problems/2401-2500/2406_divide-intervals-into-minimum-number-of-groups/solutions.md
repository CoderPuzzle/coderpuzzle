# Solutions — Divide Intervals Into Minimum Number of Groups

## Endpoint sweep (maximum overlap)

The minimum number of groups equals the maximum number of intervals that cover a single point: at any point covered by `d` intervals, those `d` must land in distinct groups since they pairwise intersect there; conversely, that peak depth always suffices (repeatedly threading intervals through depth slots gives a valid assignment). So the task reduces to computing the peak of the coverage function, which needs no per-point scanning.

Extract the start points and end points into two separately sorted arrays and sweep them with two pointers, treating intervals as inclusive. When `starts[i] <= ends[j]`, the next event is an opening at a coordinate where at least one interval is still live — the `<=` rather than `<` is exactly what makes touching intervals such as `[1, 5]` and `[5, 8]` count as intersecting — so the active count rises and `i` advances; otherwise an interval closes first, the active count falls, and `j` advances. The maximum active count along the way is the answer.

![The example intervals drawn over a time axis with the coverage depth as a step function underneath: three intervals coincide over [2, 3], and the touching point t = 5 plus the [6, 8] window keep the depth at its peak of 3.](figures/solution-depth-sweep.svg)

The loop runs until the start pointer is exhausted, since only openings can create new depth; the leftover ends merely close the remaining intervals and cannot raise the maximum. Sorting dominates the work.

**Complexity:** `O(n log n)` time, `O(n)` space.
