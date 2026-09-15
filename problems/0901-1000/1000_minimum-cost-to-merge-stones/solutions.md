# Solutions — Minimum Cost to Merge Stones

## Interval DP with a pile-count dimension

A feasibility gate comes first: each merge replaces `k` piles with one, shrinking the pile count by `k - 1`, so `n` piles can ever reach `1` only if `k - 1` divides `n - 1`; otherwise the answer is immediately `-1`. Merges only ever combine consecutive piles, so every pile at any moment occupies a contiguous block of the original row — that is what makes interval DP valid here.

`dp[i][j][m]` is the minimum cost to compress `stones[i..j]` into exactly `m` piles. For `m >= 2`, split the interval at `mid`: reduce the left part to a single pile and the right part to `m - 1` piles, giving `dp[i][j][m] = min(dp[i][mid][1] + dp[mid + 1][j][m - 1])` over all `mid`. This asymmetric split (one pile on the left, the rest on the right) still enumerates every reachable configuration, because any collection of `m` piles inside the interval has a well-defined first pile covering some prefix, and the split point is chosen at that prefix's end. When an interval reaches `k` piles, those merge into one at a cost equal to the total stones present — prefix sums answer that in `O(1)`: `dp[i][j][1] = dp[i][j][k] + prefix[j + 1] - prefix[i]`.

Intervals are processed by increasing length so every subinterval is final before it is used, with `dp[i][i][1] = 0` as the base. Unreachable states stay at infinity, guarded by the `< INF` checks, and the answer is `dp[0][n - 1][1]` (with a final `-1` guard for safety).

**Complexity:** `O(n^3 * k)` time, `O(n^2 * k)` space.
