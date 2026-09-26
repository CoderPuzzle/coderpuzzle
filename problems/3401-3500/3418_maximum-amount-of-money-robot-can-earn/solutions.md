# Solutions — Maximum Amount of Money Robot Can Earn

## Grid DP with a neutralization budget

Without robbers this is the classic grid-path maximum: the best route to
a cell can only arrive from above or from the left, so one row-major
sweep of running maxima solves it. The neutralization ability adds one
small dimension — the budget. Track three layers per cell,
`dp[k][j]` for `k = 0, 1, 2` neutralizations already spent, and let each
cell combine them two ways: walk in normally from a neighbor's `k` layer
and add `coins[i][j]`, or — only when the cell holds a robber — spend
one charge, add 0 for this cell, and enter from a neighbor's `k-1`
layer. The start cell seeds all three layers (a robber there can be
neutralized immediately); the answer is the largest of the three layers
at the goal, since spending fewer charges is always allowed.

![On coins = [[0,1,-1],[1,-2,3],[2,-3,4]], the three k = 0, 1, 2 layers fill row-major to 7, 8, 8 at the goal — the k = 1 layer spends its charge to enter the -2 for free along the accented path, so the answer is 8.](figures/solution-neutralization-budget-dp.svg)

The layers update in place over a rolling row: the left neighbor is
already the current row's value, while the three cell-above values are
snapshotted before being overwritten — that snapshot is what keeps the
`k-1` transitions reading the previous row rather than the partially
updated one. Every total stays within 999 cells times 1000 coins, so
32-bit integers carry it everywhere, and a sentinel of about −10⁹ marks
"no route", far below any reachable total.

**Complexity:** `O(m * n * 3)` time, `O(n)` space beyond the input.
