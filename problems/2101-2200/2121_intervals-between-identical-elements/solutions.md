# Solutions — Intervals Between Identical Elements

## Accumulate distances from both directions

Scan left to right while storing, for each value, how many matching indices have appeared and their index sum. At index `i`, those earlier occurrences contribute `i * count - sum`. Repeat from right to left; later occurrences contribute `sum - i * count`.

![For arr = [2,1,3,1,2,3,3], the 3 at pivot index 5 splits its distance sum in two: the earlier 3 contributes 5·1 − 2 = 3 and the later one 6 − 5·1 = 1, so intervals[5] = 3 + 1 = 4.](figures/solution-pivot-splits-distance-sum.svg)

Add both contributions into a 64-bit result array because a distance sum can exceed signed 32-bit range.

**Complexity:** `O(n)` time and `O(n)` space.
