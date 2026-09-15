# Solutions — Elements in Array After Removing and Replacing Elements

## Locate each query within the cycle

For an original length `m`, the process repeats every `2m` minutes. At phase `p < m`, `p` leading elements have been removed, so the current array is `nums[p:]` and query index `i` refers to original index `p + i` when that index exists.

At phase `p >= m`, exactly `p - m` elements have been restored, so the current array is the prefix `nums[:p - m]`; return `nums[i]` only when `i` lies inside that prefix. Every other query returns `-1`.

**Complexity:** `O(q)` time and `O(1)` auxiliary space besides the `O(q)` returned array.
