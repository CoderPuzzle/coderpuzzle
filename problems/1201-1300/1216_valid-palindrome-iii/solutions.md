# Solutions — Valid Palindrome III

## Longest Palindromic Subsequence

The key insight is a reformulation: deleting characters to leave a palindrome is the same as keeping a palindromic subsequence. The string is a k-palindrome exactly when some palindromic subsequence of length at least `n - k` exists, i.e. when `n - LPS(s) <= k`, where `LPS(s)` is the length of the longest palindromic subsequence. Removals of at most `k` characters and a kept core of at least `n - k` characters are two views of the same choice.

The longest palindromic subsequence is computed with the classic interval DP: `dp[i][j]` is the LPS length of the substring `s[i..j]`. When the two end characters match, they wrap around whatever the best answer is for the inside interval, giving `dp[i][j] = dp[i+1][j-1] + 2`; when they differ, at least one of the two ends can be discarded, so the answer is the better of the two shrunk intervals. Single characters form the base case with value 1.

The loops fill the table by moving `i` from right to left and `j` from `i + 1` leftward-to-right, so every strictly smaller interval referenced by a transition is already computed: `dp[i+1][j-1]`, `dp[i+1][j]`, and `dp[i][j-1]` all cover fewer characters than `dp[i][j]`. The empty-string guard makes the `n == 1` (and degenerate) cases safe, though a single character is trivially a palindrome within any `k >= 0`. The final comparison `n - dp[0][n-1] <= k` turns the subsequence length back into a deletion count.

**Complexity:** `O(n²)` time, `O(n²)` space.
