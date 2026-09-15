# Solutions — Managers with at Least 5 Direct Reports

## Count each manager's direct reports

The manager named by a row lives in the same table: `managerId` holds the
`id` of that manager, so a manager's direct reports are exactly the rows
whose `managerId` equals that manager's `id`. `GROUP BY managerId` gathers
those rows into one group per manager and `HAVING COUNT(*) >= 5` keeps the
groups of five or more, so the subquery
`SELECT managerId FROM Employee GROUP BY managerId HAVING COUNT(*) >= 5`
emits precisely the ids of managers with at least five direct reports. The
outer `WHERE id IN (...)` keeps the `Employee` rows of those managers, and
the projection is the answer's one column, `name`.

Rows that must not qualify disappear on their own. An employee whose
`managerId` is null has no manager; those rows form their own group under
`GROUP BY managerId`, but null never equals an `id`, so that group can
never surface a manager — even when five or more manager-less employees
share the null. Directness needs no enforcement either: the group of a
manager counts only rows that name them, so a mid-level manager with a
deep subtree but four direct reports fails the `HAVING`, while a manager
who is themselves somebody's report qualifies like anyone else. Because
`id` is the primary key each qualifying manager owns exactly one row, so
the output holds one `name` per qualifying manager and no duplicates.

One aggregation pass over the `E` rows of `Employee` materializes the
qualifying ids — at most one per manager, `M` of them — and the outer
scan performs one membership test per row against that id set. Equivalent
shapes reach the same rows: a self-join
`Employee e JOIN Employee m ON e.id = e.managerId GROUP BY e.managerId
HAVING COUNT(*) >= 5` projecting `m.name`, a windowed
`COUNT(*) OVER (PARTITION BY managerId)` with a filter, or a correlated
`(SELECT COUNT(*) FROM Employee e WHERE e.managerId = Employee.id)

> = 5`— but the grouped`IN` states the keep-set directly.

**Complexity:** `O(E)` time, `O(M)` space.
