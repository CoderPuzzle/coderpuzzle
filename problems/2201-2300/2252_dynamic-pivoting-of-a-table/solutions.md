# Solutions — Dynamic Pivoting of a Table

## Discover the store list, then aggregate over it

SQLite has no dynamic SQL, so the pivot is built in two stages driven by the judge's `__COLUMNS__` substitution. The first statement is a discovery `SELECT`: it takes `SELECT DISTINCT store FROM Products`, and for each store renders one pivot expression as text — `max(CASE WHEN store = '...' THEN price END) AS "..."` — with `quote()` producing a safely escaped string literal for the match and `replace(store, '"', '""')` producing a safely escaped double-quoted identifier for the alias. `group_concat(... ORDER BY store)` fuses the expressions into one comma-separated list in lexicographical order, which is exactly the column order the problem demands.

The judge substitutes that list into every `__COLUMNS__` of the remaining statements, so the answer `SELECT` becomes a conventional static pivot: `SELECT product_id, max(CASE WHEN store = 'LC_Store' THEN price END) AS "LC_Store", ... FROM Products GROUP BY product_id`. Grouping by `product_id` collapses each product's rows into one output row; inside a group, the `CASE` for store S passes `price` through only for that store's row, and `max` over zero matching rows is SQL `NULL` — precisely the "null if the product is not sold in a store" cell. `ORDER BY product_id` fixes the row order to the canonical one the judge compares against.

The discovery scan touches every row once and sorts at most 30 store names; the substituted answer is one grouped pass over the table evaluating one `CASE` per store per row.

**Complexity:** O(n·s) time over n seeded rows and s ≤ 30 stores, O(p·s) space for p products.
