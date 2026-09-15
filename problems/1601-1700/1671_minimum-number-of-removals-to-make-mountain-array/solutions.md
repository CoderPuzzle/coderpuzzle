# Solutions — Minimum Number of Removals to Make Mountain Array

## Longest Bitonic Subsequence

A mountain is a strictly increasing prefix followed by a strictly decreasing suffix sharing a peak. Minimizing removals equals maximizing the mountain length, which for a candidate peak `i` is the longest strictly increasing subsequence ending at `i` plus the longest strictly decreasing subarray-style chain starting at `i`, double-counting the peak itself: `lis[i] + lds[i] - 1`.

Both tables come from quadratic dynamic programming. `lis[i]` is `1 + max(lis[j])` over `j < i` with `nums[j] < nums[i]` (scanning left to right), and `lds[i]` is defined symmetrically scanning right to left over `j > i` with `nums[j] < nums[i]`. Strict comparisons throughout matter — plateaus cannot be part of either slope. Each table is a double loop, which is comfortable at the given constraint sizes and avoids the coordinate-compression machinery of the `O(n log n)` variants.

A valid peak needs `lis[i] >= 2` and `lds[i] >= 2`, i.e. at least one element on each side, otherwise the "mountain" degenerates into a monotone run. The answer is `n` minus the best such length; a strictly monotone input (no valid peak) still yields a well-defined result because any strictly increasing-then-decreasing selection requires both sides, and the constraints guarantee `n >= 3`.

**Complexity:** `O(n²)` time, `O(n)` space.
