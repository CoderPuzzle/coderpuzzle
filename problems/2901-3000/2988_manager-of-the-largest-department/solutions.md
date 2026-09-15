# Solutions — Manager of the Largest Department

## Count each department, then keep the ties at the top

A department's size is never stored — it is the number of `Employees` rows
sharing its `dep_id` — so the query first materializes one count per
department: a CTE applies `GROUP BY dep_id` with `COUNT(*)` and produces
the pairs `dep_id, emp_count`. The largest size is a single scalar over
that small table, `(SELECT MAX(emp_count) FROM counts)`, and the outer
query keeps exactly the counts equal to it. That equality — not a
`LIMIT 1` — is what lets ties survive: every department sharing the
maximum stays in play, which the statement explicitly allows.

The kept rows still have to yield a manager's name, so the outer query
joins `counts` back to `Employees` on `dep_id` and filters
`position = 'Manager'`. Each surviving department contributes exactly its
manager row, and `ORDER BY dep_id` emits those rows in the order the
statement fixes. The final `SELECT` lists `manager_name` and then
`dep_id`, matching the required column order.

Grouping the `n` employee rows into `d` counts is one aggregation pass,
the scalar maximum scans the `d` counts once, and the join probes the
employees once more; the sort at the end touches only the tied output
rows. **Complexity:** `O(n log n)` time, `O(n)` space.
