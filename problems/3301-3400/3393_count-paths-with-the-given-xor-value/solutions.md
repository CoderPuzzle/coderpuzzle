# Solutions — Count Paths With the Given XOR Value

## Grid DP with XOR Value as State

A path from `(0, 0)` to `(m-1, n-1)` using only right and down moves is built incrementally, and whether a partial path can be completed depends only on its current cell and the XOR of its values so far — future choices can't depend on anything else. That motivates `dp[i][j][x]` = the number of paths from the start to `(i, j)` whose value XOR is exactly `x`, computed modulo `10⁹ + 7`.

The transition folds the current cell into the XOR: a path arriving at `(i, j)` with final prefix XOR `x` must have come from above or from the left with prefix XOR `x ^ grid[i][j]`, so `dp[i][j][x] = dp[i-1][j][x ^ v] + dp[i][j-1][x ^ v]`. The base case seeds `dp[0][0][grid[0][0]] = 1`, and the answer reads `dp[m-1][n-1][k]` after filling the table in row-major order.

Because every value is below 16, the XOR state lives in `[0, 16)`, making the state space just `m · n · 16` — at most `300 · 300 · 16 ≈ 1.4` million entries — and each cell's 16 states are computed in constant time. XOR's self-inverse property is what allows the transition to run backwards through the current value (`x ^ v ^ v = x`), keeping every intermediate XOR a valid state.

Edge cases: a 1×1 grid answers `1` iff `grid[0][0] == k`; cells with value 0 leave the running XOR unchanged, which the recurrence handles without special-casing; unreachable XOR targets simply stay zero, including when the grid's values make parity (`popcount` of `k`) impossible.

**Complexity:** `O(m · n · 16)` time, `O(m · n · 16)` space.
