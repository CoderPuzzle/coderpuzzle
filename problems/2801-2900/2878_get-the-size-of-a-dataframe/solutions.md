# Solutions — Get the Size of a DataFrame

## Count rows and columns with two aggregate CTEs

The testcase's tables already carry the frame's shape one row per unit:
`PlayerColumns` holds exactly one row per column of `players`, and
`Players` holds exactly one row per row of the frame. Both dimensions of
the requested `[number of rows, number of columns]` are therefore plain
row counts, and each collapses to a `COUNT(*)` over its table — the SQL
counterpart of the pandas `shape` call the hint suggests.

The two counts must come back side by side in a single row, so the query
bundles them in two single-row CTEs and cross joins them: an aggregate
without a `GROUP BY` always produces exactly one row (zero when the frame
side is empty), so the join fans out to exactly one output row holding
both values.

The counts are insert-order independent — a frame keeps its size however
its rows and columns are seeded — so no ordering or position handling is
needed anywhere in the query.

**Complexity:** `O(r + c)` time, `O(1)` space — the two `COUNT(*)` scans
touch each of the `r` frame rows and `c` frame columns once, and the
output is a single two-value row.
