# Solutions — Group Sold Products By The Date

## One GROUP BY with COUNT and GROUP_CONCAT over DISTINCT products

Grouping by `sell_date` collapses the duplicates that the table permits
into one output row per day. Inside each group, `COUNT(DISTINCT product)`
reports how many different products sold, and
`GROUP_CONCAT(DISTINCT product ORDER BY product)` builds the comma-
separated name list — SQLite's `GROUP_CONCAT` accepts both qualifiers, so
the dedup and the lexicographic ordering happen inside the aggregate with
no subquery or join. An outer `ORDER BY sell_date` fixes the row order.

**Complexity:** one scan of the table plus an in-group sort,
`O(n log n)` time overall, `O(n)` space.
