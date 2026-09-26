# Solutions — Filter Occupied Intervals

## Merge and cut

Sort intervals by start, then merge adjacent intervals when the next start is
at most one greater than the current end. This produces the minimal set of
touching occupied intervals.

For each merged interval, remove the free range by checking whether it
overlaps on the left, right, or both sides. Keep the non-free pieces in sorted
order. Because the merged intervals are already disjoint and sorted, the
remaining pieces stay sorted.

![Example 1's number line: [2,6],[4,8],[10,10],[10,12],[14,16] merge into [2,8],[10,12],[14,16], and cutting the free window [7,11] out leaves [2,6],[12,12],[14,16].](figures/solution-merge-then-cut-free-window.svg)

**Complexity:** `O(n log n)` time, `O(n)` space.
