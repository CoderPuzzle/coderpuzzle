# Solutions — Project Employees II

## Group by Project, Filter Against the Global Maximum

Group `Project` by `project_id` and count each project's employees
with `COUNT(employee_id)`. The maximum count across every project is
computed once with a scalar subquery — the same grouped counts,
wrapped and reduced with `MAX` — so it is evaluated as a constant
rather than recomputed per group. `HAVING` then keeps every project
whose count equals that maximum, which is what makes ties come out
correctly: an `ORDER BY ... LIMIT 1` would only ever surface one
project even when several share the top employee count, silently
dropping the rest.

Each `Project` row is read once and folds into a per-project
accumulator, so with hash grouping the outer query runs in one linear
sweep over the table (sort-based plans add a log factor); the inner
subquery re-scans the same grouped counts once more to find the
maximum.

**Complexity:** `O(N)` time and `O(P)` space, for `N` Project rows and
`P` distinct projects.
