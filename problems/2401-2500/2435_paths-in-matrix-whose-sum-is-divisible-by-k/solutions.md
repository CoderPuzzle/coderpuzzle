# Solutions — Paths in Matrix Whose Sum Is Divisible by K

## Dynamic Programming over Path-Sum Remainders

Only the remainder of a path's sum modulo `k` matters, never the actual sum, so the state space can be collapsed from huge sums to just `k` residue classes. Define for each cell a vector of `k` counters where entry `v` counts the paths reaching that cell whose element sum is congruent to `v` modulo `k`. Since every path enters a cell either from above or from the left, the vector at `(i, j)` is the sum of the two incoming vectors, each shifted cyclically by `grid[i][j] % k`: a path arriving with remainder `r` leaves with remainder `(r + g) % k`, so the counter for target `v` pulls from incoming counter `(v - g) % k`. The answer is the modulo-0 entry of the vector at the bottom-right cell, taken modulo `10^9 + 7`.

The implementation processes cells row by row, keeping one vector per column in a rolling array `dp[j]`; when cell `(i, j)` is computed, `dp[j]` still holds the row above and `dp[j-1]` already holds the current row's left neighbor, exactly the two predecessors. The top-left cell seeds a fresh vector with a single 1 in position `grid[0][0] % k`; first-row and first-column cells simply skip the missing predecessor. The `None` guards cover degenerate shapes and keep the row swap safe.

![The example grid with each cell's value and its remainder-count vector for k = 3: the corner vector [2 1 3] holds 2 remainder-0 paths, traced by the solid 5+2+4+5+2 = 18 and dashed 5+3+0+5+2 = 15 routes.](figures/solution-remainder-vectors.svg)

Work per cell is `O(k)` for the two shifted vector additions, giving `O(m*n*k)` total, which fits comfortably because `m*n <= 5*10^4` and `k <= 50`. Space is the rolling array of `n` vectors of length `k`, i.e. `O(n*k)`; values are reduced modulo `10^9 + 7` at every addition to keep arithmetic on machine integers.

**Complexity:** `O(m*n*k)` time, `O(n*k)` space.
