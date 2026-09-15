# Solutions — Students With Invalid Departments

## Approach: Left join, keep the unmatched

A student is invalid exactly when their `department_id` matches no row of
`Departments`. A `LEFT JOIN` on that column keeps every student — matched
or not — and the unmatched ones are precisely those whose joined
department columns stay `NULL`; since `Departments.id` is a primary key
(it can never itself be null), `WHERE d.id IS NULL` selects exactly the
dangling references with no false positives.

Projecting `Students.id` and `Students.name` gives the required two
columns; any output order is accepted, so no `ORDER BY` is needed.

**Complexity:** `O(S + D)` rows touched with `S` students and `D`
departments (hash join), `O(S)` output in the worst case.
