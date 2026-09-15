# Solutions — Minimize Product Sum of Two Arrays

Checking arrangements one at a time is factorial, and even a local-swap
search has no obvious stopping point. The rearrangement inequality
settles it globally: for two sorted sequences, the sum of products is
minimized by pairing the smallest of one with the largest of the other,
and any inversion of that pairing can only increase the total.

## Sort ascending against descending

Sort `nums1` in ascending order and `nums2` in descending order, then
sum the elementwise products. By the rearrangement inequality this
opposite-order matching achieves the minimum over all permutations of
`nums1`: if `a1 <= a2` and `b1 <= b2`, then `a1*b2 + a2*b1 <= a1*b1 +
a2*b2`, so every out-of-order pair can be uncrossed without raising the
sum.

Each product is at most `100 * 100 = 10^4` and there are up to `10^5`
terms, so the sum fits comfortably in 64 bits.

**Complexity:** `O(n log n)` time for the sorts, `O(n)` space (or `O(1)`
extra when sorting in place).
