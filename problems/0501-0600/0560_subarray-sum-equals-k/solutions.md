# Solutions — Subarray Sum Equals K

## Prefix-Sum Hash Map

The subarray sum from index `i` to `j` is the difference of two prefix sums: `sum(i, j) = prefix(j) - prefix(i-1)`. A subarray ending at `j` sums to `k` exactly when some earlier prefix equals `prefix(j) - k`. So while scanning left to right with a running prefix sum, the number of valid subarrays ending at the current index is simply the number of times `running - k` has appeared as a prefix sum before.

The solution keeps those prefix-sum frequencies in a hash map, seeded with `{0: 1}`. The seed is essential: without it, subarrays that start at index 0 (whose "previous prefix" is the empty prefix of value 0) would be missed. At each element it first adds `prefix_counts.get(running - k, 0)` to the total and only then records the current running sum — this ordering guarantees the counted prefixes are strictly earlier ones, so a subarray is never matched against itself.

Because `nums[i]` can be negative, the prefix sums are not monotonic and window-based techniques break down; the hash map handles negative values, zeros, and `k = 0` uniformly since it only ever tests exact equality of sums. Each element is processed once with O(1) expected map operations.

**Complexity:** `O(n)` time, `O(n)` space.
