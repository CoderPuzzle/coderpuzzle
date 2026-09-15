# Solutions — Count Subarrays With More Ones Than Zeros

## Prefix sums and a Fenwick tree

Treat each `1` as `+1` and each `0` as `-1`. A subarray has more ones than
zeros exactly when its ending prefix sum is strictly greater than the prefix
sum immediately before it. Thus, while scanning the array, the number of valid
subarrays ending at the current position is the number of earlier prefix sums
that are strictly smaller.

Store the frequencies of prior prefix sums in a Fenwick tree, shifted so the
range from `-n` through `n` has positive indices. Insert the initial zero
prefix, query only indices below each current prefix to enforce strict
inequality, add that count modulo `10⁹ + 7`, and then insert the current prefix.

**Complexity:** `O(n log n)` time and `O(n)` space.
