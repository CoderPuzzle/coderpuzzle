# Solutions — Create Grid With Exactly K Paths I

## Fixed k-blocks plus a tail corridor

A board with a single row or column can only ever show one path, so for
`m == 1` or `n == 1` the answer is the all-open line when `k == 1` and the
empty array otherwise. Otherwise path counts multiply across cells the route
must pass through, which makes a two-piece construction exact: a small block
holding exactly `k` internal paths, followed by a one-path corridor from the
block's bottom-right cell to `(m - 1, n - 1)`. Every path threads the block
then the corridor, so the total is `k · 1`.

The block vocabulary is fixed per `k`: a `1 x 1` cell for 1, an open `2 x 2`
for 2 (two paths), an open `2 x 3` or `3 x 2` for 3, and for 4 either an open
`2 x 4` / `4 x 2` or a `3 x 3` with its top-right and bottom-left cells
blocked. Candidates are tried until one fits inside `m x n`; if none does —
exactly the boards whose fully open path count `C(m + n - 2, m - 1)` is below
`k` — no grid exists and the empty array is returned.

**Complexity:** `O(m · n)` time and space to fill and emit the grid.
