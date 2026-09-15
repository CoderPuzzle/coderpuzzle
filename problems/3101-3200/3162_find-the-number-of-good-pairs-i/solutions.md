# Solutions — Find the Number of Good Pairs I

## Check every pair

The domain is deliberately tiny — both arrays hold at most 50 values no
larger than 50, and `k` is at most 50 — so the nested double loop the hint
suggests is not just acceptable, it is the right engineering call: at most
2,500 pair tests, each one modulo. For every value of `nums1` and every
entry of `nums2`, form the candidate divisor `nums2[j] * k` (never more than
2,500, comfortably inside any integer type) and count the pair when it
divides `nums1[i]`.

Nothing needs precomputation or a hash structure at this scale; folding the
count in place keeps every port to three lines inside the loops. The total
count is bounded by `n * m <= 2500`, so the answer itself fits easily in a
32-bit integer.

**Complexity:** `O(n * m)` time, `O(1)` extra space.
