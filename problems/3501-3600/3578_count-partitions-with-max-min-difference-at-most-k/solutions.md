# Solutions — Count Partitions With Max-Min Difference at Most K

## Sliding-window DP with monotonic deques

Let `dp[i + 1]` be the number of ways to partition the first `i + 1`
elements. The last segment of such a partition is `nums[j..i]` for some
start `j`, so `dp[i + 1]` is the sum of `dp[j]` over every `j` whose
segment fits. That set of starts is a contiguous range ending at `i`:
shrinking a segment can only remove elements, so if `nums[j..i]` has
spread at most `k`, so does every `nums[j'..i]` with `j' > j`. The left
edge `lo` therefore only moves forward, and each step extends the window
by one element and advances `lo` while the window's `max − min` exceeds
`k`. Two monotonic deques of indices — values increasing, values
decreasing — expose the current window minimum and maximum in constant
time, including the fronts abandoned as `lo` advances.

With `pre` the prefix sums of `dp`, the answer for one position is the
single subtraction `pre[i + 1] − pre[lo]`, and the total is `dp[n]`,
taken modulo `10⁹ + 7`. Every stored value is reduced before use, so the
only arithmetic beyond additions is one guarded subtraction — no product
of two residues ever appears, and 32-bit-safe (JS-`Number`-exact)
intermediates suffice throughout.

**Complexity:** `O(n)` time — each index enters and leaves each deque
once — and `O(n)` space.
