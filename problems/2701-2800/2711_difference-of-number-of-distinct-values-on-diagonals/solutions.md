# Solutions — Difference of Number of Distinct Values on Diagonals

## Sweep each diagonal twice with running sets

For every cell we need the number of distinct values strictly above-left
along its own main diagonal, and the same below-right. Cells on different
diagonals never interact — each cell `(r, c)` only ever compares against
`(r-k, c-k)` and `(r+k, c+k)` — so each diagonal can be processed
independently: enumerate its top-left origin (every cell in column 0 plus
row 0 excluding the duplicate corner), then walk it once downward keeping a
running hash set. When arriving at a cell, the set holds exactly its
strictly left-above values, so `leftAbove` is just the current set size,
recorded before inserting the cell's own value.

Rather than storing a second pass's results in a separate table, the same
diagonal is then walked back upward with a fresh set: at each step the set
holds exactly the cell's strictly right-below values, so `rightBelow` is
that size, read before insertion, and `answer[x][y] = |stored - size|`
folds both counts together in place inside the output matrix. Every cell is
touched a constant number of times with O(1)-average set operations, and
the diagonals are iterated from origins rather than per cell, avoiding any
auxiliary count tables.

**Complexity:** `O(m·n)` time, `O(min(m,n))` working space beyond the
output.
