# Solutions — Number of Increasing Paths in a Grid

## Memoized DP over Cells Sorted by Value

Define `dp[i][j]` as the number of strictly increasing paths that start at cell `(i, j)`. Every such path is either the single cell itself plus, for each of the four neighbors with a strictly larger value, any increasing path starting at that neighbor: `dp[i][j] = 1 + Σ dp[ni][nj]` over neighbors with `grid[ni][nj] > grid[i][j]`. This is valid because a strictly increasing path can never revisit a cell (values strictly rise along it), so the recursion is acyclic and neighbor subproblems are independent. The final answer sums `dp` over all cells, since a path is identified by its starting cell and its sequence.

Rather than memoizing recursively (risky over a `10^5`-cell grid in Python), the canonical solution processes cells in decreasing order of value. When cell `(i, j)` is handled, every neighbor with a larger value has already been finalized — it appeared earlier in the sorted order — so `dp` entries are simply read and added, with `dp` initialized to 1 everywhere to represent the length-1 path. Sorting the value-index tuples in reverse gives this order in one shot, without buckets or explicit level grouping.

Each cell contributes its count modulo `10^9 + 7` at insertion time, so intermediate sums never overflow (and stay exact in Python regardless). Ties are handled correctly: neighbors with equal value fail the strict inequality and are skipped, so plateau cells never chain into each other. The degenerate 1-cell grid returns 1. Sorting dominates, and the four-direction scan is constant work per cell.

**Complexity:** `O(mn log(mn))` time, `O(mn)` space.
