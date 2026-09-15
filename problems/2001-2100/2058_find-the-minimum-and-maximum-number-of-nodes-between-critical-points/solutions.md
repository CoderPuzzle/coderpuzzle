# Solutions — Find the Minimum and Maximum Number of Nodes Between Critical Points

## Track adjacent critical positions

Walk the list iteratively with a previous, current, and next node, so only nodes with both neighbors are tested. When the current value is strictly above both neighbors or strictly below both, record its index. The gap from the previous critical index is a candidate minimum.

Keep only the first and most recent critical indices in addition to the minimum adjacent gap. Fewer than two critical points yields `[-1, -1]`; otherwise, the maximum distance is the last critical index minus the first. Strict comparisons ensure plateaus are never classified as extrema.

**Complexity:** `O(n)` time and `O(1)` auxiliary space.
