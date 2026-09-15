# Solutions — Maximum Array Hopping Score I

A hop pays `(j - i) * nums[j]`, so where a leg starts fixes only its length
while its worth is set entirely at the landing spot. With lengths up to
`10³`, trying every landing spot from every position is affordable, and that
is exactly what the two hints suggest.

## Suffix dynamic programming

Let `dp[i]` be the best score obtainable starting a path at index `i` and
ending at the last element. The first hop from `i` lands on some `j > i`,
earning `(j - i) * nums[j]` plus whatever the optimal continuation from `j`
earns, so `dp[i] = max over j > i of (j - i) * nums[j] + dp[j]`, with
`dp[n - 1] = 0`. Filling right to left needs each cell to consult only
later ones; the answer is `dp[0]`, and every loop is iterative.

All scores stay comfortably inside 32 bits: a path's hop distances telescope
to exactly `n - 1` units in total, so the score is at most
`(n - 1) * max(nums) <= 999 * 10⁵ ≈ 10⁹ < 2³¹`.

**Complexity:** `O(n²)` time, `O(n)` space.
