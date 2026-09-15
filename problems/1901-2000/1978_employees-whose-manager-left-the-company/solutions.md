# Solutions — Employees Whose Manager Left the Company

## `NOT IN` against the employee id set, with explicit null handling

Three conditions must hold for an employee to appear in the answer: the
salary is strictly below `30000`, the `manager_id` is not null, and that
`manager_id` is absent from the table — the manager's own row was deleted
when they left. Each condition is a separate `WHERE` term, so the query
reads directly off the statement.

The "manager left" test is a `NOT IN` subquery listing every `employee_id`
currently in the table. An employee whose manager is still employed has
their `manager_id` in that list and is filtered out; an employee whose
manager left has an id that matches no row. The explicit `manager_id IS NOT
NULL` guard matters because `NOT IN` over a set never matches a null — an
employee without a manager would otherwise be silently dropped even though
the question is about a departed manager, not the absence of one.

A final `ORDER BY employee_id` emits the rows in the ascending order the
statement requires, so the returned row set matches the expected table
exactly.

**Complexity:** `O(n log n)` time (the subquery scan plus the sort),
`O(n)` space.
