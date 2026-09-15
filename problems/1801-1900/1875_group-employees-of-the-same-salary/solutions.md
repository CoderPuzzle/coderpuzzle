# Solutions — Group Employees of the Same Salary

The grouping rule has two parts that must be computed before any row can
be output: which salaries appear at least twice, and the dense rank of
those salaries among themselves. A single query over a salary-level
subquery answers both at once.

## Salary-level ranking join

Aggregate `Employees` by `salary` and keep only groups with
`COUNT(*) >= 2`; within that filtered set, compute each salary's dense
rank ascending with `DENSE_RANK() OVER (ORDER BY salary)`. Joining this
small derived table back to `Employees` on `salary` reattaches the
employee columns, and employees whose salary never reappears drop out of
the join naturally.

Because the rank is computed after filtering to team salaries only,
unique salaries cannot consume a rank number — exactly the statement's
note about non-team salaries being excluded from the ranking.

**Complexity:** `O(r log r)` time for `r` rows, `O(r)` additional space.
