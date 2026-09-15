# Solutions — Minimum XOR Sum of Two Arrays

## Bitmask DP

With `n <= 14`, subsets of `nums2` are enumerable: there are at most `2^14` of them. The DP state `dp[mask]` is the minimum total XOR achievable by pairing the first `popcount(mask)` elements of `nums1` with exactly the positions of `nums2` selected in `mask`. The popcount makes the state unambiguous — the set of chosen `nums2` slots tells you precisely which prefix of `nums1` has been consumed, since pairings always consume `nums1` in order, which loses no generality (any matching can be reordered into a prefix-by-prefix assignment).

Transitions iterate the masks in increasing numeric order, which is safe because clearing any set bit produces a strictly smaller index, so every dependency is already resolved. For a mask with `popcount(mask) = i + 1`, the element being placed is `nums1[i]`; the code enumerates the set bits `j` of the mask with the lowbit trick and takes the best of `dp[mask without j] + (nums1[i] ^ nums2[j])`. The full mask's entry is the answer, and `dp[0] = 0` seeds the recursion.

This is the assignment problem solved by exponential dynamic programming — about `2^14 · 14` transitions in the worst case, instantaneous in practice. Duplicate values across the two arrays cause no trouble because states are indexed by positions, not values.

**Complexity:** `O(2^n · n)` time, `O(2^n)` space.
