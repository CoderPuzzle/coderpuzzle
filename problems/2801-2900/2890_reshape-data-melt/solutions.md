# Solutions — Reshape Data: Melt

## Fan the four quarter columns out with UNION ALL, then order the long result

Melting turns one wide row into one long row per quarter column, so the
compound select reads the seeded `report` table four times — once per
quarter. Every branch projects the same shape: the product, a quarter
label written as a string literal (`'quarter_1'`, `'quarter_2'`,
`'quarter_3'`, `'quarter_4'`), and that column's value aliased as
`sales`, plus the `row_position` the ordering needs. `UNION ALL` (not
`UNION`) is required because melting keeps every fanned row even when a
product's quarters hold equal values, which duplicate-eliminating
`UNION` would silently collapse.

A table guarantees no order of its own, so the melted result must be
sorted explicitly. `ORDER BY quarter, row_position` orders the rows by
the quarter label, whose ascending lexicographic order is exactly the
`quarter_1` … `quarter_4` variable order, and inside each quarter block
restores the frame's row order through `row_position`. Wrapping the
compound select in a derived table keeps that ordering key out of the
three-column result. Sorting by `row_position` alone would interleave
the quarters, and sorting by `product` would break frames whose rows are
not alphabetical — only the pair of keys reproduces the melted frame.

**Complexity:** `O(n log n)` time, `O(n)` space — the compound select
fans `n` wide rows into `4n` long rows and sorts them, and the melted
result itself holds all `4n` rows.
