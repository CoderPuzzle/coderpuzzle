# Solutions — Bomb Enemy

## Row and column segment counts

A bomb planted on an empty cell kills everything in its row and its column up
to the next wall in each of the four directions — that is, the enemies in the
two wall-free segments crossing the cell. Walls therefore cut every row and
every column into segments, and each empty cell in the same segment shares
exactly that segment's enemies along that axis: the kill count of a cell is
its row segment's enemy total plus its column segment's. Nothing needs to be
recomputed per cell — only per segment.

Those segment totals are derived by run length, each segment counted once per
pass. Walking a row left to right, whenever the previous cell is a wall or the
edge, one forward scan tallies the enemies up to the next wall and parks the
total in `row_hits`, which every later cell of the segment then reuses.
Columns are counted the same way, lazily: `col_hits[j]` is recounted only when
the cell above `(i, j)` is a wall or the top edge, so a column segment is
scanned exactly once, at its first cell. When a cell is `'0'`, the candidate
is `row_hits + col_hits[j]`.

Because each cell of the grid is visited once by the outer walk and at most
once more by the scan of the row segment and the column segment it belongs
to, the whole sweep is linear in the grid. The only bookkeeping beyond
scalars is the `n` column counters, one per column; `row_hits` is a single
value reset per segment. At the `500 x 500` ceiling the answer is at most
`499 + 499` enemies, far inside a 32-bit integer.

**Complexity:** `O(mn)` time, `O(n)` space.
