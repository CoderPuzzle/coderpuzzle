# Solutions — Create Grid With Exactly One Path

## Single L-shaped corridor

Exactly one path survives when the free cells themselves form a corridor that
is already monotone: any right/down path has to walk the corridor end to end,
and no branching is possible because every other cell is blocked. The simplest
such corridor is an L — run along the top row from `(0, 0)` to `(0, n-1)`,
then down the last column to `(m-1, n-1)`.

The grid is therefore a fully open first row, followed by `m - 1` rows that
are all obstacles except their last cell. Degenerate shapes fall out for
free: `m = 1` leaves only the open row and `n = 1` leaves only the open
column, both trivially single-path.

**Complexity:** `O(m · n)` time to emit the grid, `O(m · n)` space for it.
