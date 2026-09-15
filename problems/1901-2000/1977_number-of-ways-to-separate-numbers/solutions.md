# Solutions — Number of Ways to Separate Numbers

## Dynamic Programming with Longest Common Prefix

Let `dp[i][j]` be the number of ways to split the prefix `num[:i]` such that the last number is `num[i-j:i]` of length `j`. The list must be non-decreasing, so the previous number (of some length `k`) must satisfy `num[i-j-k : i-j] <= num[i-j : i]` as integers. If `k < j` the previous number has fewer digits and is automatically smaller, and if `k = j` the comparison is a lexicographic comparison of two equal-length substrings, which is decided by their first differing character. Storing prefix sums `pre[i][j] = sum of dp[i][1..j]` makes the `k < j` case a single lookup: `dp[i][j] = pre[i-j][min(j-1, i-j)]` plus, when the equal-length case is valid, `dp[i-j][j]`.

Comparing equal-length substrings naively would cost `O(j)` per cell and `O(n^3)` overall, which is too slow for `n = 3500`. The fix is preprocessing `lcp[i][j]`, the length of the longest common prefix of `num[i:]` and `num[j:]`, computed by a standard backward dynamic program in `O(n^2)`. With `a = i - 2j` and `b = i - j` the two candidates start at `a` and `b`; if `lcp[a][b] >= j` they are identical, and otherwise the character pair at offset `lcp[a][b]` decides the comparison in `O(1)`.

Edge cases are handled inside the recurrence: a last number with a leading zero (`num[i-j] == '0'`) contributes nothing, the case `j == i` (the whole prefix as one number) contributes exactly 1, and an input starting with `'0'` returns 0 immediately since no valid first number exists. The answer is `pre[n][n]`, the total over all lengths of the final number, taken modulo `10^9 + 7`.

**Complexity:** `O(n^2)` time, `O(n^2)` space.
