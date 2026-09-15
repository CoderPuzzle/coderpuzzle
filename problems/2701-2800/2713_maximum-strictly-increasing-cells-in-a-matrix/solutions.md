# Solutions — Maximum Strictly Increasing Cells in a Matrix

## Ascending value sweep with running row/column maxima

A chain can only ever step into strictly greater values, so between the
cells of one value class nothing contributes beyond a single visit, and no
chain ever returns to a smaller value once it has moved up. Process the
distinct matrix values smallest-first, keeping two running tables:
`rowMax[r]` and `colMax[c]` hold the longest settled chain that ends
anywhere in row `r` / column `c` among already-processed, strictly smaller
values. The answer for a cell is then simply one more than the better of
its two line maxima — exactly the best move available from it.

Cells sharing one value must settle together as a read-then-write batch:
their lengths all read the state from before their layer, so an
equal-valued neighbour can never leak into an answer, and only after the
whole batch is computed do the tables absorb it. All cells of the largest
batch settle in one pass, and since every per-cell answer reads pre-batch
state, ties and negative values need no special casing — sorting orders
both. Counts stay far below `m*n <= 10⁵`, so plain 32-bit integers carry
every intermediate.

Flattening the matrix into `(value, r, c)` triples and sorting costs
`O(mn log mn)`; each triple thereafter does constant work. The sorted
triple list dominates space at `O(mn)` (the two tables themselves are only
`O(m + n)`).

**Complexity:** `O(mn log mn)` time (the sort), `O(mn)` space.
