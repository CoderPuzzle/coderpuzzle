# Solutions — Check if Grid Satisfies Conditions

## Column-wise sweep

The two cell conditions combine into two simpler whole-grid facts. The
vertical rule chains: `grid[i][j] == grid[i + 1][j]` for every adjacent
pair is the same statement as "every column is one constant value". And
once a column is constant, the horizontal rule `grid[i][j] != grid[i][j+1]`
holds for every row of that pair of columns exactly when it holds for the
top row, because all other rows only repeat the top row's values through
the vertical rule.

So a single column sweep decides everything: walk the columns left to
right, verify each column is constant by comparing against its top cell,
and require neighbouring columns to differ at the top row only. Each
comparison is made at most once per cell, and both rules are enforced with
no extra memory.

**Complexity:** `O(m * n)` time, `O(1)` space.
