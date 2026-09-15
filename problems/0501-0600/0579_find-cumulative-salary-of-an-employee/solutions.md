# Solutions — Find Cumulative Salary of an Employee

## A RANGE frame over the calendar, the last month dropped

The definition splits into two per-employee operations: each worked month
`m` needs the sum of the salary rows in calendar months `m-2`, `m-1`, and
`m` — a month with no row contributes nothing, which is the 0-fill the
statement demands — and each employee's most recent worked month must not
be reported. Both live in one window pass:
`SUM(salary) OVER (PARTITION BY id ORDER BY month RANGE BETWEEN 2
PRECEDING AND CURRENT ROW)` and `MAX(month) OVER (PARTITION BY id)`,
computed in the same SELECT so every row leaves carrying its own 3-month
sum and its employee's last worked month.

The RANGE keyword is the whole trick, and it is a semantic choice, not a
stylistic one. A RANGE frame draws its boundaries in the `ORDER BY` value,
so the frame of a month-7 row is exactly the rows whose month is 5, 6, or
7 — months 5 and 6 having no rows means they add 0 — while a ROWS frame
would take the previous two rows of the partition whatever their months
are, and bridge the gap: employee 1's month-7 row in the example would
sum 90 + 60 + 40 = 190 instead of 90. The partition on `id` keeps every
employee's calendar separate, and since `(id, month)` is the primary key
there is at most one row per frame slot, so the window sum needs no
pre-aggregation.

The filter then restores the exclusion: keeping `month < last_month`
drops precisely each employee's most recent worked month, and an employee
with a single worked month vanishes altogether — that month is their most
recent, so nothing of theirs survives. The closing ORDER BY restates the
demanded output order, id ascending then month descending; the judge
compares rows as an unordered multiset, so the order is faithful to the
statement rather than machine-checked. The classical alternative is the
self-join — `LEFT JOIN Employee e2 ON e2.id = e1.id AND e2.month BETWEEN
e1.month - 2 AND e1.month` grouped by `(e1.id, e1.month)` — which spells
the calendar window as join arithmetic and pays a nested-loop join where
the window pays one sort.

One sort per partition feeds both window functions, and the output rows
are a subset of the input rows, so nothing beyond the sort buffer is
materialized. With `E` salary rows the sort dominates.

**Complexity:** `O(E log E)` time, `O(E)` space.
