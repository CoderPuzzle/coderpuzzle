# Solutions — Find the Maximum Length of a Good Subsequence II

## Dynamic programming over values with per-transition maxima

Values are remapped to compact ids first (their magnitudes are irrelevant), and the state is dp[j][v]: the longest good subsequence ending in value v whose adjacent positions differ exactly j times. An element x can extend a subsequence in three ways — appended after another x (no new transition, dp[j][x] + 1), appended after any different value (one more transition, best over v != x at j - 1, plus 1), or start a fresh subsequence of length 1. The last option only matters at j = 0, since for j > 0 the transition term is always at least 1.

The expensive term is "best over v != x", and recomputing it per element would be O(n·k·V). Instead each level j maintains the maximum of dp[j] over all values (best1), its argmax (val1), and the best over the remaining values (best2). The top over v != x is then best1[j-1] unless x itself is the argmax, in which case best2[j-1] takes over — both O(1). After writing the new candidate into dp[j][x], the top-two bookkeeping is patched: bump best1 when x already owns it, otherwise push the new value down into the structure, demoting the old best to best2 when it is overtaken.

Processing elements strictly left to right keeps every reference to j - 1 from the previous element's state, which is what the recurrence needs. The answer is the maximum of best1 over all transition counts up to k, since any valid subsequence has some exact number of transitions in that range.

**Complexity:** `O(n · k)` time, `O(n · k)` space.
