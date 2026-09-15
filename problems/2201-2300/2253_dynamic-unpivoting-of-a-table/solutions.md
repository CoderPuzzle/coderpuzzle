# Solutions — Dynamic Unpivoting of a Table

## Discover the store columns, then expand every row

The store columns change from testcase to testcase, so the submission starts with a discovery `SELECT` over SQLite's table-valued pragma `pragma_table_info('Products')`, which yields one row per column of the seeded table in declaration order. Filtering out `product_id`, it renders each remaining column twice — `quote(name)` as a string literal and `replace(name, '"', '""')` wrapped in double quotes as a column reference — and `group_concat` fuses the pairs into one comma-separated list. The judge substitutes that list into every `__COLUMNS__` of the following statements.

The answer `SELECT` unpivots through JSON expansion: `json_object(__COLUMNS__)` builds, for each row of `Products`, a JSON object mapping every store name to that row's column value, and the lateral `json_each` join explodes that object into one (key, value) pair per store — so `Products CROSS JOIN json_each` multiplies each stored row into n candidate rows carrying `json_each.key` as the store name and `json_each.value` as the price. A SQL `NULL` price becomes a JSON `null` and reads back as SQL `NULL`, so `WHERE json_each.value IS NOT NULL` drops exactly the store combinations where the product is not available, while a genuine `0` price is a JSON number and survives. The output exposes the three judged column names via aliases, ordered by `product_id` then `store` as the canonical form.

The discovery is one catalog scan; the answer streams the cross product of n stored rows with their s ≤ 30 store columns — each row of `Products` is visited once and expanded s times.

**Complexity:** O(n·s) time over n products and s ≤ 30 stores, O(n·s) space for the result.
