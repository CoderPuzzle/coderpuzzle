# Solutions — Matrix Cells in Distance Order

## Bucket sort by Manhattan distance, discovered in row-major order

The largest distance any cell can be from `(rCenter, cCenter)` is bounded —
each coordinate's worst case is whichever of its two grid edges sits
farther from the center, so `max(rCenter, rows - 1 - rCenter) +
max(cCenter, cols - 1 - cCenter)` caps every distance the grid can
produce. That bound sizes an array of buckets, one per possible distance.

Scanning the grid in a plain row-major double loop, over rows then
columns, computes each cell's distance and appends the cell to the
matching bucket. Because the scan itself visits cells in ascending row
order and, within a row, ascending column order, every bucket collects
its cells already in that order — no separate sort is needed to satisfy
the judge's tie-break. Concatenating the buckets from distance 0 upward
then produces the full answer: non-decreasing distance overall, and
ascending `(row, col)` among cells that tie.

**Complexity:** `O(rows * cols)` time, `O(rows * cols)` space for the
buckets and the output.
