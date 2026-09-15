# Solutions — Increment Submatrices by One

## Row-Wise Difference Arrays

Adding 1 over a rectangle for every query and materializing the result at the end is the 2-D range-update pattern: record updates lazily, then restore the true values with one prefix-sum pass. This implementation applies the 1-D difference trick independently to each row: for a query `[r1, c1, r2, c2]`, every row `r` in `[r1, r2]` gets `+1` at column `c1` and `-1` at column `c2 + 1` in `diff[r]`.

![The 3x4 difference array for queries [1,1,2,2] and [0,0,1,1] next to the matrix recovered by row-wise running sums.](figures/solution-difference-array.svg)

Each row's difference array carries one extra trailing column (`n + 1` entries) so the `c2 + 1` write never goes out of bounds even when `c2 = n - 1`; that sentinel column is simply never read back. After all queries are folded in, reconstruct each row by running a cumulative sum over its first `n` difference entries — the negative markers cancel earlier positives exactly at the right edge, yielding the count of rectangles covering each cell.

The cost split matters here: each query touches `r2 - r1 + 1` rows, so the update phase costs O(q·n) in the worst case, while the reconstruction phase is the unavoidable O(n²) needed just to emit the answer matrix. With `n <= 500` and `q <= 10^4` this is well within limits, whereas a naive per-query cell update would be O(q·n²). Queries that cover the full matrix or a single cell need no special casing — the markers land wherever the coordinates dictate.

**Complexity:** `O(n² + qn)` time, `O(n²)` space.
