# Solutions — Delete Operation for Two Strings

## Longest Common Subsequence

Whatever the two words are turned into by deletions, the surviving text must be a subsequence common to both — you can only delete, never rewrite. Conversely, any common subsequence can be achieved by deleting everything else. So the minimum number of deletions is `len(word1) + len(word2) - 2 * LCS(word1, word2)`, and the problem reduces to computing the length of the longest common subsequence.

The solution fills the classic LCS table: `dp[i][j]` is the LCS length of the first `i` characters of `word1` and the first `j` characters of `word2`. When the current characters match, the diagonal value extends by one; otherwise the best of dropping the last character from either string carries forward. Row and column 0 stay zero, representing an empty prefix matched against anything.

A worked example makes the reduction concrete: for `"sea"` and `"eat"`, the LCS is `"ea"` of length 2, giving `3 + 3 - 2 * 2 = 2` deletions. The table is built bottom-up over all `(len(word1) + 1) * (len(word2) + 1)` cells, and the final answer reads the bottom-right corner.

![The LCS table for "sea" against "eat"; the diagonal match on the shared 'a' builds the corner value 2.](figures/solution-lcs-table.svg)

The table depends on both full prefixes, so a full two-dimensional array is used rather than a rolling row; with lengths up to 500 that is at most about 250,000 cells.

**Complexity:** `O(L1 · L2)` time, `O(L1 · L2)` space, where `L1` and `L2` are the two word lengths.
