# Solutions — Reformat Department Table

## Group by id, conditionally sum into month columns

A pivot in SQL is one `GROUP BY` with an expression per output column. The
rows collapse onto their department id; each of the twelve revenue columns
is produced by a conditional aggregate that looks at only its own month:
`SUM(CASE WHEN month = 'Jan' THEN revenue END)`. Rows of other months
contribute nothing (the `CASE` falls through to NULL, which `SUM` ignores),
and a department with no January row at all sums over zero rows, leaving
the column NULL — exactly the required empty cell.

Because `(id, month)` is the primary key, at most one row per department
can match any given month's predicate, so the conditional `SUM` is a pure
selection — no arithmetic across multiple rows ever happens. `GROUP BY id`
guarantees one output row per department.

**Complexity:** `O(N · 12)` predicate evaluations for `N` Department rows —
`O(N)` time overall per group pass, `O(D)` space for the grouped result
with `D` departments.
