# Solutions — Smallest Stable Index I

## Simulate every index

Check candidate indices from left to right so that the first successful one
is automatically the requested answer. For a candidate `i`, scan
`nums[0..i]` to find its maximum and scan `nums[i..n - 1]` to find its
minimum. Their difference is exactly the instability score from the
definition.

Return `i` as soon as that difference is at most `k`; if every candidate
fails, return `-1`. The array has at most 100 elements, so directly repeating
the two scans for each index is comfortably within the limit.

**Complexity:** `O(n²)` time, `O(1)` space.
