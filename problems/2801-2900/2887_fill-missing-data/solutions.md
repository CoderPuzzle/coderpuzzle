# Solutions — Fill Missing Data

## Fill the NULL quantities with 0 in the SELECT list, in frame order

The `products` table already holds one row per DataFrame row, so filling
the missing quantities is a projection, not a stored mutation: the SELECT
list names `name` and `price` unchanged, and the second entry computes
`COALESCE(quantity, 0) AS quantity`, which evaluates to each row's own
stored quantity when it is present and to `0` when it is `NULL` — the SQL
counterpart of `products['quantity'].fillna(0)`. Aliasing the expression
as `quantity` keeps the output's column name and position identical to the
original frame, and no other column can be missing, so `COALESCE` over the
one nullable column is the whole fill. The fill is row-wise, so it never
adds or removes a row: the output has exactly one row per frame row, even
when every quantity is missing — unlike a drop of the missing rows, which
would shrink the frame.

A table guarantees no order of its own, so the query sorts by
`row_position` with `ORDER BY row_position ASC` to reproduce the frame's
original row order no matter what order the dataset's INSERT statements
used: identity inserts, reversed inserts, and shuffled inserts all
collapse to the same output.

**Complexity:** `O(n log n)` time, `O(n)` space — the `n` rows are scanned,
filled, and ordered by `row_position`, and the result table itself holds
all `n` rows.
