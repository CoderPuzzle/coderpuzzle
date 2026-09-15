# Solutions — Smallest Stable Index II

## Suffix minima and a running prefix maximum

Precompute `suffixMin[i]`, the minimum value from index `i` through the end,
with one right-to-left pass. Then scan the array from left to right while
maintaining the largest value seen so far. At index `i`, those two values are
exactly `max(nums[0..i])` and `min(nums[i..n - 1])`, so their difference is
the instability score.

The scan visits indices in ascending order and returns immediately when the
score is at most `k`, which guarantees the smallest stable index. If no score
passes the test, return `-1`.

**Complexity:** `O(n)` time, `O(n)` space.
