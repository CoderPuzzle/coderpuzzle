# Solutions — Find the Number of Good Pairs II

## Distinct-base multiple census

A pair is good exactly when `nums2[j] * k` divides `nums1[i]`, so grouping
both arrays by value collapses the pairwise scan into a value census. If
`amount` copies of some base `b` occur in nums2, every number in nums1 that
is a multiple of `b * k` pairs with each of them, so those bases contribute
`amount` times the count of nums1 elements divisible by `b * k`. Counting
occurrences of every nums1 value into a frequency table lets one walk over
the multiples `step`, `2 * step`, ... up to the largest value answer a whole
base class at once, and duplicate bases in nums2 are folded into their map
entry so each walk happens once.

The work is the divisor-sum shape: walking multiples of every distinct base
costs at most `V * (1 + 1/2 + ...) = O(V log V)` index visits for `V =
max(nums1) <= 10⁶` (about `1.4 * 10⁷` even if nums2 contains every base from
1 to 10⁵), plus linear passes to build the tables — far below the
per-element `O(sqrt(v))` factorization hinted at, and indifferent to input
length except for the counting passes. Bases whose `b * k` overshoots the
largest nums1 value are skipped outright, which also keeps the loop bounds
in fixed-width languages inside `int`.

The return widens to 64-bit honestly: with `n = m = 10⁵` every pair can be
good, so the answer reaches `10¹⁰`, past what 32-bit ints hold; Java, C++,
Go, and Rust accumulate in 64-bit. JavaScript numbers stay exact because
every intermediate product and running total remains an integer below
`2⁵³ ≈ 9 * 10¹⁵`.

**Complexity:** `O(n + m + V log V)` time, `O(V)` space.
