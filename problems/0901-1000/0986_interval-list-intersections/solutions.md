# Solutions — Interval List Intersections

## Two-pointer sweep

Both lists are sorted and internally disjoint, which invites a merge-style sweep: keep one pointer into each list and compare the two current intervals. Their intersection, if any, is `[max(starts), min(ends)]` — the code computes `lo = max(firstList[i][0], secondList[j][0])` and `hi = min(firstList[i][1], secondList[j][1])`, and appends `[lo, hi]` exactly when `lo <= hi`. Because the intervals are closed, touching endpoints still count: `[1, 5]` against `[5, 8]` yields the single point `[5, 5]`.

After recording (or noting the absence of) the overlap, the pointer of the interval that ends earlier advances. That interval can never intersect anything later in the other list — every subsequent interval there starts strictly after its end — so it is finished forever and dropping it is safe. When the two ends are equal, the code advances `j`; either choice would be fine, since the retired interval's end cannot overlap anything starting strictly later.

![The two example lists as lanes, with the six computed overlaps aligned below them.](figures/solution-interval-lanes.svg)

The loop stops as soon as either list is exhausted, so an empty input list immediately yields an empty output, and the sweep performs at most `m + n` pointer advances in total.

**Complexity:** `O(m + n)` time, `O(1)` auxiliary space beyond the output list.
