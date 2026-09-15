# Solutions — Department Highest Salary

## Group the maxima, then join back

The answer needs each department's top salary and every employee sitting at
it. `(SELECT departmentId, MAX(salary) FROM Employee GROUP BY departmentId)`
computes the maxima in one grouped pass, and joining `Employee` back onto
that subquery with an `ON` that requires both `departmentId` and `salary`
to match keeps exactly those employees: the equality on salary admits every
row tied at the group's maximum — a tie yields several output rows, as in
the example where both Jim and Max survive — while nothing below the
maximum can ever match, since `MAX` produces one value per group. The final
`JOIN Department d ON e.departmentId = d.id` turns the surviving ids into
department names, and the three selected columns are aliased `Department`,
`Employee`, and `Salary`.

The inner-join shape needs no special cases because the grouped subquery
has a row for precisely the departments that have employees: an empty
`Employee` table produces no groups and therefore no output rows, and a
department with no employees never surfaces for the same reason — every
department that does appear contributes at least its maximum earner.
Equivalent shapes reach the same keep-set other ways —
`DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC) = 1`
ranks each department once and keeps its first rank, and the correlated
`salary = (SELECT MAX(salary) FROM Employee e2 WHERE e2.departmentId =
e.departmentId)` re-derives each row's group maximum at the cost of one
aggregation per row.

The grouped pass hashes the `E` employee rows by `departmentId`, holding
only the `D` group maxima; the join back probes those maxima once per
employee, and the department-name join resolves `D` ids. Nothing beyond
the group table and the output itself is materialized.

**Complexity:** `O(E + D)` time, `O(D)` space.
