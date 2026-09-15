# Solutions — Maximize Palindrome Length From Subsequences

## Longest palindromic subsequence over the concatenation

Concatenate the two words into `s = word1 + word2` and let `n` be the length
of `word1`. Every candidate palindrome is a subsequence of `s` whose first
index lies in word1's half and whose last index lies in word2's half —
requiring both subsequences to be non-empty is exactly that
boundary-crossing condition. And any palindrome that crosses the boundary
starts and ends with equal characters `s[i] == s[j]` where `i < n <= j`,
because its first character comes from the earlier word and its last from the
later one.

One interval-DP table settles everything: `dp[i][j]`, the length of the
longest palindromic subsequence of `s[i .. j]`, filled with `i` descending
and `j` ascending so the two dependencies `dp[i+1][...]` and `dp[i][...-1]`
are always ready. When the ends match, `dp[i][j] = dp[i+1][j-1] + 2`; when
they differ, dropping either end keeps the better of the two remainders.
Whenever the matching ends straddle the boundary, that same value is a
palindrome assembled from both words, so the answer is the maximum of
`dp[i][j]` over exactly those cells — and 0 when no boundary pair matches,
which is the "no palindromes can be constructed" case. The fill is iterative
throughout, so a 2000-character concatenation needs no recursion at all.

**Complexity:** `O(n²)` time, `O(n²)` space, with `n` the combined length.
