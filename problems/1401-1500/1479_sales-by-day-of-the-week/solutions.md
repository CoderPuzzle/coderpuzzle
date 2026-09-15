# Solutions — Sales by Day of the Week

## LEFT JOIN from Items with one conditional SUM per weekday

The report must contain every category — even ones that never sold — so
the driving table has to be `Items`, not `Orders`: a `LEFT JOIN` keeps
each category row when no order matches it, leaving the joined columns
`NULL` for those categories. Grouping by `item_category` then collapses
the join to one row per category.

Each weekday becomes its own column via a conditional aggregate:
`SUM(CASE WHEN STRFTIME('%w', order_date) = '<d>' THEN quantity ELSE 0
END)`. SQLite's `%w` maps dates to `'0'`=Sunday … `'6'`=Saturday, so the
seven aggregates read Monday-first by asking for `'1'` through `'6'` then
`'0'`. A category with no orders contributes one joined row whose date is
`NULL`: every CASE comparison fails and the aggregate sums only zeros,
which is exactly the all-zero report row the statement asks for. An outer
`ORDER BY item_category` fixes the row order.

**Complexity:** one join plus one grouped scan of the orders,
`O(n + m log m)` time for `n` orders and `m` categories, `O(m)` space.
