# Solutions — Reshape Data: Pivot

## Discover the city list, then aggregate over it

SQLite has no dynamic SQL, so the pivot is built in two stages driven by the judge's `__COLUMNS__` substitution. The first statement is a discovery `SELECT`: it takes `SELECT DISTINCT city FROM weather` and, for each city, renders one pivot expression as text — `max(CASE WHEN city = '...' THEN temperature END) AS "..."` — with `quote()` producing a safely escaped string literal for the match and `replace(city, '"', '""')` producing a safely escaped double-quoted identifier for the alias. `group_concat(... ORDER BY city)` fuses the expressions into one comma-separated list in lexicographical order, which is exactly the column order the example shows.

The judge substitutes that list into every `__COLUMNS__` of the remaining statements, so the answer `SELECT` becomes a conventional static pivot: `SELECT month, max(CASE WHEN city = 'ElPaso' THEN temperature END) AS "ElPaso", ... FROM weather GROUP BY month`. Grouping by `month` collapses each month's rows into one output row; inside a group, the `CASE` for city C passes `temperature` through only for that city's row, and `max` over zero matching rows is SQL `NULL` — the missing-cell value when a (month, city) reading is absent from the seed. `ORDER BY month` fixes the rows to the lexicographical month order the example shows (`April` before `February` before `January`).

The discovery scan touches every row once and sorts the distinct cities; the substituted answer is one grouped pass over the table evaluating one `CASE` per city per row.

**Complexity:** O(n·c) time over n seeded rows and c distinct cities, O(m·c) space for m months.
