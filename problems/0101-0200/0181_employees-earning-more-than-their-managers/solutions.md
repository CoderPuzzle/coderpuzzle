# Solutions — Employees Earning More Than Their Managers

## Self-join Employee on managerId

The manager named by a row lives in the same table: `managerId` holds the
`id` of that manager, so pairing each employee with their manager is a join
of `Employee` with itself. `Employee e1 JOIN Employee e2 ON e1.managerId =
e2.id` reads the table as two copies — `e1` walking the employees, `e2`
supplying the matched manager's row — and `WHERE e1.salary > e2.salary`
keeps exactly the pairs where the employee out-earns the manager. The
projection is the answer's one column, `e1.name AS Employee`.

Rows that must not qualify disappear on their own. An employee whose
`managerId` is null — a manager-less executive like the example's Sam and
Max — carries a join key that matches no `e2.id`, and an inner join never
emits them; a `managerId` naming an id that is not in the table meets the
same fate, so no existence check is needed. Strictness does the remaining
filtering: an employee who exactly ties their manager fails `>`, and because
`id` is the primary key each employee matches at most one manager row, so
the output holds one row per qualifying employee and no duplicates.

The join builds one lookup over the `E` rows and probes it once per employee
— a hash join, or an index on `id`, makes each probe constant time — so the
whole query is a linear pass that materializes only the join structure and
its output.

**Complexity:** `O(E)` time, `O(E)` space.
