# Solutions — Symmetric Coordinates

## Self join on mirrored coordinates

A coordinate qualifies exactly when its mirror image sits somewhere in the
table, so the query pairs every row of `Coordinates` with every row whose
columns are swapped: a self join on the two mirror conditions
`a.X = b.Y AND a.Y = b.X`. Row `(20, 21)` matches row `(21, 20)` this way,
and a diagonal row like `(20, 20)` matches its own duplicate — which is
why the example's two identical `(20, 20)` rows report the coordinate even
though the pair must consist of two coordinates.

The `WHERE a.X <= a.Y` clause keeps only the canonical half of each
mirrored pair: of `(20, 21)` and `(21, 20)` exactly one satisfies it, so
no coordinate is reported twice from both directions. Because the table
may contain duplicate values, one surviving coordinate can still be
produced by several matching row pairs, and `SELECT DISTINCT` collapses
those to the unique coordinates the statement asks for. The final
`ORDER BY x, y` matches the required ascending order on X then Y. The
self join scans every ordered pair of rows — quadratic in the table size,
with the small distinct output materialized afterwards.

**Complexity:** `O(n²)` time (row-pair scan), `O(n²)` space.
