# Solutions — Employees With Missing Information

## Symmetric difference of the two ID sets via `NOT IN` unions

An employee's information is incomplete exactly when their ID lives in one
table but not the other. The query therefore collects two disjoint sets: the
`Employees` IDs absent from `Salaries` (salary is missing) and the `Salaries`
IDs absent from `Employees` (name is missing). Each half is a `SELECT ... WHERE
employee_id NOT IN (SELECT employee_id FROM other_table)`, and `UNION` merges
the two halves — they are disjoint by construction, so `UNION`'s deduplication
never collapses a real row.

Because each `employee_id` is unique within its own table, neither half can
contain a duplicate, and a single ID can satisfy at most one of the two
`NOT IN` predicates. Every missing employee is reported exactly once, and
every employee present in both tables satisfies neither predicate and is
excluded. A final `ORDER BY employee_id` emits the result in the ascending
order the statement requires, so the row set matches the expected table
exactly.

Each half scans its table and probes the other table's IDs; the `UNION`
combines them and the sort orders the result.

**Complexity:** `O(n log n)` time, `O(n)` space.
