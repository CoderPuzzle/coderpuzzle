# Solutions — Shortest Common Supersequence

## Longest Common Subsequence with Reconstruction

Any common supersequence must contain str1 and str2 as subsequences, and the characters it needs beyond that minimum are exactly a longest common subsequence: each LCS character is shared once, while all other characters of both strings appear separately. Hence the optimal length is |str1| + |str2| − LCS, and an optimal string is built by walking the LCS. The code fills dp[i][j] = LCS length of the suffixes str1[i:] and str2[j:], iterating i and j downward so each cell reads only cells with larger indices — a suffix-oriented table that makes forward reconstruction natural.

The reconstruction walks (i, j) from (0, 0). When the current characters match, they are the next shared character: emit one copy and advance both pointers. Otherwise the code compares dp[i+1][j] against dp[i][j+1] to decide which pointer can be advanced without shortening the achievable LCS, emits the character from the string it consumes, and continues. Ties prefer consuming str1, which is safe because either choice preserves optimality. When either string runs out, the remainder of the other is appended — those characters can no longer match anything.

Correctness rests on the greedy being an LCS witness: at every step the emitted unmatched character is provably not part of every remaining LCS, so the walk uses a full-length common subsequence and each of its characters exactly once. Edge cases: identical strings take the match branch throughout and return themselves; strings with no common character emit both strings in the tie order.

**Complexity:** `O(n·m)` time, `O(n·m)` space, for input lengths n and m.
