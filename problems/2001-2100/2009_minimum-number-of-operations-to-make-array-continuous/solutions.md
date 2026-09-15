# Solutions — Minimum Number of Operations to Make Array Continuous

## Sorted unique sliding window

Let `n` be the original array length. After sorting and removing duplicates, a set of values can remain unchanged together exactly when its maximum and minimum differ by at most `n - 1`; every other position can be replaced by a missing value from that continuous interval. Thus the answer is `n` minus the largest number of distinct values that fit in such a window.

Sweep the unique sorted values with two pointers, advancing the left pointer whenever the current difference is at least `n`. The right pointer only moves forward, so the scan is linear after sorting. Fixed-width implementations perform the difference in 64-bit arithmetic to keep the boundary comparison safe.

**Complexity:** `O(n log n)` time, `O(n)` space.
