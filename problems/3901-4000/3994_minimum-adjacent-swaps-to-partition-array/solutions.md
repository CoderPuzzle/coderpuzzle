# Solutions — Minimum Adjacent Swaps to Partition Array

## Three-group inversion count

Map each value to `0`, `1`, or `2` according to its position relative to
`a` and `b`. A good array is exactly the group array sorted in non-decreasing
order, and each adjacent swap fixes one inversion.

Scan left to right while counting previous group values greater than the
current group. Since there are only three groups, constant-space counters
suffice.

**Complexity:** `O(n)` time, `O(n)` space for the group array.
