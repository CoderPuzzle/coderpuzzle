# Solutions — Construct 2D Grid Matching Graph Layout

## Degree-guided grid reconstruction

The shape of the grid is readable straight from the degree sequence. A grid
with `rows x cols` cells has `2·rows·cols - rows - cols` edges, so
`rows + cols = 2n - |edges|`, and the pair `(rows, cols)` is the unique
factorization of `n` with that sum. Degree 1 marks the two ends of a
`1 x C` (or `R x 1`) path, which is walked off directly from an endpoint.
Otherwise every dimension is at least 2 and the degree-2 nodes are exactly
the four corners.

Pick any corner `x` and try each of its two neighbors as the second cell of
the first row. Extending the row is unambiguous: standing at `w` having come
from `p`, the true next cell is the unplaced neighbor of `w` that shares no
neighbor with `p` (excluding `w` itself), because the cell below `w` always
shares the side cell between them with `p`. If a direction stalls before the
row reaches `cols` cells, it was the column direction (or a degenerate
orientation) — abandon it and the other choice succeeds.

With the first row fixed, every later cell is forced: the first cell of a new
row is the unique unplaced neighbor of the cell above it, and cell `j` of a
new row is the unique unplaced common neighbor of `new_row[j-1]` and the cell
above. Since grid degrees never exceed 4, all neighbor tests are constant-time
scans over adjacency lists, giving a linear reconstruction.

**Complexity:** `O(n + |edges|)` time, `O(n + |edges|)` space.
