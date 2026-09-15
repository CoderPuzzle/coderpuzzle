# Solutions — Toeplitz Matrix

A Toeplitz matrix carries one value per top-left-to-bottom-right diagonal,
however often that value repeats. The condition reads global — whole
diagonals must each be constant — but it decomposes into purely local
checks, because a diagonal can only stop being constant at some adjacent
pair of its cells, and the cell following `(r, c)` on its diagonal is
exactly `(r + 1, c + 1)`.

## Compare each cell with its top-left neighbor

Every cell `(r, c)` with `r >= 1` and `c >= 1` continues the diagonal that
passes through `(r - 1, c - 1)`, so that diagonal is constant precisely when
all of its consecutive pairs agree. Checking every such pair is therefore
equivalent to checking every diagonal: a mismatch at any pair is a broken
diagonal, and if no pair mismatches, each diagonal was verified link by link
from its first cell to its last. The cells of row `0` and column `0` have no
top-left neighbor because they begin their diagonals — nothing can disagree
with them, and the sweep rightly starts at row `1`, column `1`.

The implementation is that argument verbatim: walk rows `1` through `m - 1`,
compare each cell with its top-left neighbor, and return `false` at the
first disagreement. A single row or column leaves the interior empty, and
the untouched loop returns `true` — correct, since in a `1 x n` or `m x 1`
matrix every diagonal is a lone cell. Degenerate shapes need no special
case, and no diagonal index or bookkeeping structure is ever built: the
grid's own layout already encodes diagonal membership through the
`(r - 1, c - 1)` offset.

**Complexity:** `O(m·n)` time, `O(1)` space.
