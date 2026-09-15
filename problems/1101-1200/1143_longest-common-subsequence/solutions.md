# Solutions — Longest Common Subsequence

## Two-Row Dynamic Programming

Let `dp[i][j]` be the LCS length of the prefixes `text1[:i]` and `text2[:j]`. When the last characters match, they can always be aligned as the final character of a common subsequence, so `dp[i][j] = dp[i-1][j-1] + 1` — matching them never hurts, since any subsequence avoiding one of them can be extended or shortened to one that ends with the pair. When they differ, at least one of the two characters is unused in an optimal solution, giving `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`. Row 0 and column 0 are 0: an empty prefix shares nothing.

With `m = len(text1)` and `n = len(text2)`, the table is filled row by row, and each entry reads only the row above (`prev`) and entries to its left in the current row (`curr`), so a full `m x n` table is unnecessary: keep the previous row and build the current one, then swap. The answer is the last entry of the final row, `prev[n]`.

![The table for "abcde" against "ace"; matches extend the diagonal to the corner value 3.](figures/solution-lcs-table.svg)

This is the standard LCS recurrence made 1-pass over each cell: the match case consumes `prev[j-1]` before it is overwritten because `curr` is a fresh array, and the mismatch case mixes one value from `prev` with one already-computed `curr` value. Strings sharing no character stay at 0 throughout, and identical strings accumulate the full length along the diagonal.

**Complexity:** `O(m * n)` time, `O(n)` space.
