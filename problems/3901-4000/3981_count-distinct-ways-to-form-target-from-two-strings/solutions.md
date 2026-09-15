# Solutions

The solution uses prefix-summed two-index dynamic programming.

## Prefix-summed two-index dynamic programming

Let `dp[i][j]` count ways to form the processed target prefix whose next available positions are `i` in `word1` and `j` in `word2`. For each target character, row and column prefix sums aggregate every earlier compatible state, allowing a matching character in either word to be chosen without scanning all prior positions again.

This table also counts ways that use only one input word. Count those ordinary subsequences separately with one-dimensional dynamic programming and subtract both totals. Every update is reduced modulo 10⁹ + 7.

**Complexity:** O(|target| · |word1| · |word2|) time and O(|word1| · |word2|) space.
