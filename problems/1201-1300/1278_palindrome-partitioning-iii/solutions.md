# Solutions — Palindrome Partitioning III

## Interval Cost Table and Partition DP

The solution factors the problem into two independent pieces. First, for a fixed block `s[i..j]`, the minimum number of character changes needed to make it a palindrome is obtained by pairing position i with j, i+1 with j−1, and so on: every mismatched pair costs exactly one change (rewrite one side to match the other) and matched pairs cost nothing. This cost depends only on the interval, so it is precomputed for all intervals by increasing length using `cost[i][j] = cost[i+1][j−1] + (s[i] != s[j])`, with intervals of length 0 or 1 costing 0.

The second piece decides where to cut. Let `dp[c][i]` be the minimum number of changes to split the prefix of length `i` into exactly `c` palindromic parts. The last part must be some `s[j..i−1]`, so `dp[c][i]` is the minimum of `dp[c−1][j] + cost[j][i−1]` over all valid `j`, and `dp[1][i]` is just `cost[0][i−1]`. The loop starts `i` at `c` because `c` non-empty parts need at least `c` characters, and any `dp` entry that cannot be reached keeps a sentinel value larger than any real cost (`n // 2 + 1` upper-bounds the cost of any single interval).

The answer is `dp[k][n]`. Correctness rests on the fact that within one part, changes are optimally spent pairing that part's own characters (cross-part changes never help since parts are independent), and the partition DP exhaustively tries every placement of the last boundary.

Edge cases: `k` equal to `n` forces single-character parts, all of cost 0; `k = 1` uses the whole-string cost directly; and an already-palindromic split needs 0 changes.

**Complexity:** `O(k · n²)` time, `O(n²)` space.
