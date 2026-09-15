# Solutions — Filter Occupied Intervals

## Merge and cut

Sort intervals by start, then merge adjacent intervals when the next start is
at most one greater than the current end. This produces the minimal set of
touching occupied intervals.

For each merged interval, remove the free range by checking whether it
overlaps on the left, right, or both sides. Keep the non-free pieces in sorted
order. Because the merged intervals are already disjoint and sorted, the
remaining pieces stay sorted.

**Complexity:** `O(n log n)` time, `O(n)` space.
