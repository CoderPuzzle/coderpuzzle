# Solutions — Count the Number of Experiments

## Full cross join of the enum values, left-joined to the counts

The answer must contain all nine `(platform, experiment)` pairs, including
those with zero experiments, so the query cannot simply group the table. It
first materializes the two value lists as inline subqueries — the three
platforms and the three experiment names — and cross-joins them to obtain every
pair. A `LEFT JOIN` then brings in the `Experiments` rows that match a pair on
both columns.

The outer `GROUP BY` collapses the joined rows back to the nine pairs, and
`COUNT(x.experiment_id)` counts only matching table rows. For a pair with no
experiments the left join contributes a single row whose `experiment_id` is
`NULL`, so the count is zero instead of dropping the row entirely — exactly the
zero-fill the statement requires. The three output columns are emitted as
`platform`, `experiment_name`, and `num_experiments`, and because the statement
allows any ordering the result set is compared without regard to row order.

The cross join and the left join together scan the table once, and the final
grouping is over the constant-size nine-pair result.

**Complexity:** `O(n)` time, `O(1)` space.
