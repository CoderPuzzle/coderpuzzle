# Solutions — Maximum Consistent Columns in a Grid

## Pair compatibility DP

Two columns can be adjacent in the remaining subsequence only when every row
changes by at most `limit` between them. Precompute this compatibility for
each ordered pair of columns.

Then run a longest-subsequence DP: `dp[j]` is the best length ending at
column `j`, initialized to `1`, and extended from any compatible earlier
column. The answer is the maximum `dp[j]`.

**Complexity:** `O(m * n² + n²)` time, `O(n²)` space.
