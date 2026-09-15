# Solutions — Employees Project Allocation

## Join allocations to teams, then keep rows above their team's average

No allocation decides its own fate — the bar it must clear belongs to
its employee's whole team. The query joins `Project` to `Employees` on
`employee_id`, so every allocation carries its employee's team and
name, and then filters with a correlated scalar subquery: the same
join, restricted to one team by `e2.team = e.team`, folded by
`AVG(p2.workload)`. Because the outer row's own allocation always
survives that inner join, the subquery is never empty, and the average
runs over exactly the team's allocated employees — a member allocated
to no project has no workload row and feeds nothing. The strict
`p.workload > (...)` keeps only allocations strictly above the bar, so
a workload sitting exactly on its team's average fails the test.
`ORDER BY p.employee_id ASC, p.project_id ASC` dresses the rows in the
demanded order.

The comparison rides SQLite doubles: `AVG` returns a REAL even over
integer workloads. At this schema's magnitudes that is harmless —
integer sums stay exact well below 2^53 and the division is correctly
rounded, so an average landing on an integer or half-integer (any
dyadic rational) is represented bit-exactly and equality at the
boundary holds exactly, while a non-dyadic average such as 34/3 can
never collide with an integer workload at all. Either way `>` decides
identically to exact rational arithmetic on these integer columns.

The correlated subquery re-aggregates the join once per allocation,
quadratic in the number of allocated rows; beyond that scan only the
per-team aggregates and the result rows occupy space.

**Complexity:** `O(n^2)` time, `O(n)` space.
