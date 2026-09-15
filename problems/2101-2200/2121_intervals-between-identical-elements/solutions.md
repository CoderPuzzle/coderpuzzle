# Solutions — Intervals Between Identical Elements

## Accumulate distances from both directions

Scan left to right while storing, for each value, how many matching indices have appeared and their index sum. At index `i`, those earlier occurrences contribute `i * count - sum`. Repeat from right to left; later occurrences contribute `sum - i * count`.

Add both contributions into a 64-bit result array because a distance sum can exceed signed 32-bit range.

**Complexity:** `O(n)` time and `O(n)` space.
