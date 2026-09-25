# Solutions — Maximum Number of Points with Cost

## Row DP with Left and Right Running Maxima

Let `dp[c]` be the best score achievable with the current row's pick at column `c`. Moving to the next row, a pick at `c` can come from any previous column `p` but pays `|p - c|`, and the naive transition compares all pairs — quadratic per row. The trick is to split the absolute value by direction: for `p <= c` the carry-over is `dp[p] + p - c`, and for `p >= c` it is `dp[p] - p + c`. In each direction the only state-dependent part is `dp[p] ± p`, so the best predecessor is found with a running maximum rather than a rescan.

Concretely, each row is processed with two sweeps over the previous row's vector: a left-to-right pass computes `left[c] = max(dp[p] + p)` over `p <= c`, and a right-to-left pass computes `right[c] = max(dp[p] - p)` over `p >= c`. The new value at `c` is then `points[r][c] + max(left[c] - c, right[c] + c)` — the two-direction split guarantees every predecessor is considered under the correct sign of the penalty, including `p == c` (penalty 0, covered by both sweeps). The first row initializes the vector to its own point values, and the answer is the maximum after the last row.

![Example 1's dp vector filling row by row to [1,2,3], [2,7,4], [9,8,7]: row 2 sweeps the previous row into left = [2,8,8] and right = [6,6,2], so dp[0] = 3 + max(2, 6) = 9 — the accented picks (0,2), (1,1), (2,0) scoring 3 + 5 + 3 = 11 minus two 1-point penalties.](figures/solution-row-dp-running-max.svg)

Both sweeps are linear, so the whole matrix costs one pass per row per direction. Single-row and single-column inputs need no special casing (the sweeps degenerate gracefully), and coordinates never appear in the arithmetic except as the ±c shifts, so no index gymnastics are needed for the edges.

**Complexity:** `O(m·n)` time, `O(n)` space.
