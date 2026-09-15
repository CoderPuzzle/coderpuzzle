# Solutions — Find All Possible Stable Binary Arrays II

## Block DP with rolling window sums

A stable array is an alternating sequence of blocks — runs of equal bits
whose lengths are all at most `limit` — so `dp[x][y][d]`, the number of
stable arrays with exactly `x` zeros, `y` ones, and last bit `d`, extends by
appending one whole block of the opposite digit: `dp[x][y][0]` gains
`dp[x-k][y][1]` summed over block sizes `k = 1..limit`. The all-zeros and
all-ones prefixes seed the base cells along the axes.

The per-cell block loop disappears once those axis sums become sliding
windows: sweeping `x` upward keeps a running total of the trailing `limit`
end-in-1 cells for every column `y`, while a circular ring buffer keeps the
trailing `limit` end-in-0 cells of the current row. Every transition is then
O(1). Stored cell values are residues below the modulus, and any window sum
is bounded by `limit * MOD < 10¹²`, so 64-bit accumulators never overflow —
the answer itself is reported modulo `10⁹ + 7`.

**Complexity:** `O(zero * one)` time, `O(zero * one)` space.
