# Solutions — Maximum Balanced Subsequence Sum

## Fenwick Tree Prefix-Max DP

The balance condition `nums[j] - nums[i] >= j - i` rearranges into `nums[j] - j >= nums[i] - i`: a subsequence is balanced precisely when the transformed value `nums[x] - x` is non-decreasing along it. So the problem becomes "maximum-sum subsequence that is non-decreasing in `b[i] = nums[i] - i`", which admits the classic DP `dp[i] = nums[i] + max(0, dp[y])` over all earlier `y` with `b[y] <= b[i]` — the `max(0, ...)` because a subsequence of length one is always balanced, so a negative best predecessor is simply ignored and element `i` starts fresh.

Evaluating that max naively is quadratic; the standard speedup is a Fenwick (Binary Indexed) tree keyed by rank, storing prefix maxima instead of sums. Coordinate-compress the `b` values once, then sweep `i` left to right: query the tree for the best `dp` among ranks `<= rank(b[i])`, form `dp[i]`, track the global maximum, and then insert `dp[i]` at its rank. Non-decreasing order allows `b[y] <= b[i]`, and ties are fine since equal transformed values always satisfy the rearranged inequality — so the query includes `i`'s own rank.

The Fenwick tree needs only the max-flavored update (propagate `dp[i]` upward while it improves a node) and prefix-max query (take the best over the canonical set of covering nodes), both logarithmic. Initializing the tree to zero implements the `max(0, ...)` cutoff for free: on an all-negative array, every query returns zero, each element stands alone, and the answer is the largest single element.

**Complexity:** `O(n log n)` time, `O(n)` space.
