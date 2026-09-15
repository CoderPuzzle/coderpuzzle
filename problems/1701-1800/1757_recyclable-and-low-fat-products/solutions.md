# Solutions — Recyclable and Low Fat Products

Both flags are independent `Y`/`N` columns, and the request is their
conjunction: keep exactly the rows where `low_fats` and `recyclable`
are both `'Y'`, and project out the id.

## One filtered projection

A single `SELECT` with two equality predicates in the `WHERE` clause.
Each row passes or fails independently — no grouping, no joins — so
the engine scans the table once and emits the surviving ids. An empty
result is legitimate when no product carries both flags, and the
output order is free under the multiset comparison.

On the example rows, only ids 1 and 3 have the `Y`/`Y` combination;
ids 0 and 2 each fail one predicate, and id 4 fails both.

**Complexity:** `O(n)` time, `O(1)` extra space.
