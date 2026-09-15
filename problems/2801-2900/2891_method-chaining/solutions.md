# Solutions — Method Chaining

## Filter on weight, then sort the survivors descending

The `animals` table already holds one row per animal, so the whole chained
pandas pipeline collapses into one `SELECT` with two clauses. `WHERE
weight > 100` keeps exactly the rows the mask `animals['weight'] > 100`
keeps — the comparison is strict, so an animal weighing exactly 100 is
dropped — and naming `name` alone, rather than `SELECT *`, projects the
result to the single column the example shows. `ORDER BY weight DESC` then
performs the descending sort that following the chain with
`sort_values('weight', ascending=False)` performs on the filtered frame.

Every dataset's weights are distinct, so the descending order is total and
the judged output is deterministic: no tie-breaking rule is needed, and
where each row sits in the table — first, last, or shuffled in between —
cannot influence the result, because `WHERE` scans every row before
`ORDER BY` arranges the survivors.

**Complexity:** `O(n log n)` time, `O(n)` space — the query scans all `n`
rows of the table once and sorts the `k ≤ n` rows that pass the filter.
