# Solutions — The Number of Employees Which Report to Each Employee

One join answers the question: pair each employee with the rows that name
them as manager, and every surviving group's own size is its
`reports_count` while the rounded mean of its ages is its `average_age`.

## Self-join on reports_to and group per manager

`JOIN Employees r ON r.reports_to = e.employee_id` walks the table through
itself: one alias (`e`) plays the manager side, the other (`r`) the report
side, and the join condition keeps exactly the pairs whose `reports_to`
names the manager's `employee_id` — the statement's direct reports. The
inner join is also the manager definition: an employee whom nobody names
produces no joined row and drops out of the result without any `HAVING`
filter, so every group that survives has at least one report.
`GROUP BY e.employee_id, e.name` collapses each manager's pairs, `COUNT(*)`
counts them, and `AVG(r.age)` averages the reports' ages.

Ages are integers, so a group's average lands on a fraction only when the
count does not divide the age sum, and `ROUND` resolves those fractions
half away from zero: an average of exactly `.5` — which arises whenever an
even-sized group's ages sum to an odd number — rounds up, so example 1's
`(41 + 36) / 2 = 38.5` becomes `39`, and `37.5` or `22.5` round to `38`
and `23` the same way. `CAST(... AS INTEGER)` pins each rounded average to
an integer so the row carries `39`, not `39.0` — a real would not compare
equal to the integer the answer promises. `ORDER BY employee_id` finishes
with the ordering the statement requires; the judge compares multisets, so
the ordering is a statement requirement rather than a comparison one.

**Complexity:** `O(n log n)` time, `O(n)` space.
