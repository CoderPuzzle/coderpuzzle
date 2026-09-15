# Solutions — Stone Game V

## Interval dynamic programming over prefix sums

Every reachable row of stones is a contiguous slice `[i, j]` of the
original array, so `dp[i][j]` — the best score Alice can still collect
starting from that slice — covers every state the game can reach.
Prefix sums make any slice's weight an O(1) lookup, which turns each
candidate split at index `k` (`i <= k < j`, giving a left part `[i, k]`
and a right part `[k + 1, j]`) into an O(1) comparison: if the left part
weighs less, it survives and contributes `leftSum + dp[i][k]`; if the
right part weighs less, it survives and contributes
`rightSum + dp[k + 1][j]`; and if the two parts tie, either may survive
— Alice takes whichever continuation scores higher, so the candidate is
`leftSum + max(dp[i][k], dp[k + 1][j])` (equivalently `rightSum + …`,
since the weights are equal). `dp[i][j]` is the best candidate over every
split `k`, and the base case `dp[i][i] = 0` matches a single stone, which
cannot be split and ends the game with no further score.

The table fills by increasing slice length so both `dp[i][k]` and
`dp[k + 1][j]` are already known whenever slice `[i, j]` is processed,
and the answer is `dp[0][n - 1]`. Scores accumulate in a 64-bit integer:
with up to 500 stones worth up to 10⁶ each, the running total can exceed
what a 32-bit accumulator holds.

**Complexity:** `O(n^3)` time (`O(n^2)` slices, each trying up to `O(n)`
splits), `O(n^2)` space for the DP table (and the prefix-sum array).
