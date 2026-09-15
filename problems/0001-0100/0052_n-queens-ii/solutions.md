# Solutions — N-Queens II

## Backtracking over rows with occupancy marks

Placing exactly one queen per row removes row conflicts by construction, so the search only has to decide, row by row, which column each row's queen takes. The answer space is then a tree: the depth is the row being filled and the children of a node are its still-safe columns. A depth-first walk that tries a column, recurses on the next row, and moves on counts every root-to-leaf path of length `n` exactly once, and each completed path is one distinct solution — the count the problem asks for, so unlike its sibling problem nothing about the board ever needs to be materialized or compared.

Whether a candidate square is attacked is answered in constant time by three marks. A queen at row `r`, column `c` rules out that column for every other row, every square of the main diagonal through it — those sharing the value `r - c` — and every square of its anti-diagonal, which share `r + c`. The walk sets the three marks before descending and clears them after the branch returns, so each sibling branch inherits the same partial board. The Python solution keeps the marks in sets keyed by those two diagonal identities; the array languages fold the main-diagonal index up by `n - 1` (`row + n - 1 - column`, also the shape that keeps Rust's unsigned arithmetic from underflowing) so both diagonal families index into one `2n - 1` entry table.

Because an unsafe column is rejected before any deeper work happens, pruned branches cost a constant, and the effective size of the tree is far below the `n^n` raw bound on row-by-row placements — already tiny at the constraint's `n <= 9`, where the full answer is 352. The marks, the recursion stack, and everything else the walk touches are sized by `n`, independent of how many solutions exist.

**Complexity:** `O(n!)` time as the standard loose bound on the pruned row-by-row tree, `O(n)` auxiliary space.
