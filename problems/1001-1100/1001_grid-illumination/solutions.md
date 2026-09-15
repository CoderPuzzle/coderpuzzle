# Solutions — Grid Illumination

## Row, column, and diagonal counters

`n` can be as large as `10^9`, so the grid can never be materialized; the
grid's rows, columns, and diagonals are indexed indirectly through hash
maps keyed by the coordinate that identifies them. A lamp at `(x, y)`
illuminates row `x`, column `y`, the diagonal `x - y`, and the
anti-diagonal `x + y`, so four counters — one map each for rows, columns,
diagonals, and anti-diagonals — track how many lamps currently light each
line. A set of the actual `(x, y)` lamp positions is kept alongside so a
lamp can be located and removed in O(1); it also lets duplicate lamp
entries be ignored, since turning on the same lamp twice must not inflate
a counter.

Answering a query `(x, y)` is then a lookup: the cell is illuminated if
any of the four counters for its row, column, diagonal, or anti-diagonal
is positive. After recording the answer, the 3x3 block centered on
`(x, y)` is scanned; every one of those 9 cells that holds a lamp is
removed from the position set and its four counters are decremented. This
means a lamp switched off by one query can no longer contribute to the
illumination of a later query, so answers must be produced strictly in
query order.

**Complexity:** `O(lamps.length + queries.length)` time and
`O(lamps.length)` space.
