# Solutions — Average Salary: Departments VS Company

## Group both averages by month, then compare

The answer's grain is the (month, department) pair, so the query builds the
two averages each at its own grain and joins them on the month. The
department side, `dept`, joins `Salary` to `Employee` on `employee_id` so
every salary row knows its department, then `GROUP BY` the month prefix and
`department_id` reduces each pair to one `AVG(amount)`. The company side,
`company`, is the same grouping over `Salary` alone — one average per month
over every salary row the month holds, whatever department its earner sits
in. Joining the two on the month prefix puts each department average next
to the company average of the same month, and a `CASE` names the
relationship: strictly above reads `'higher'`, strictly below `'lower'`,
and exact equality `'same'`.

The month key does double duty as the output format. `SUBSTR(pay_date, 1,
7)` takes `2017/03/31` down to `2017/03` — the right grain, since grouping
must merge two pay dates on different days of the same month while keeping
`2016/12` apart from `2017/01` — and `REPLACE(..., '/', '-')` restyles that
prefix as the reported `2017-03`. The join also handles the empty cells by
omission: a department with no salary rows in a month has no group on the
department side, so it simply contributes no row, while an `Employee` row
without salary rows contributes nothing anywhere. A salary row whose
employee is missing from `Employee` cannot arise — the schema makes
`employee_id` a foreign key into it — which is what lets the department
side use a plain inner join.

Equality is exact, not approximate: two averages read `same` exactly when
their sums and counts balance, as in the example's February, where
department 1's 7000, department 2's (6000+8000)/2, and the company's
(7000+6000+8000)/3 are all the same rational number — and equal rationals
over these magnitudes compare equal as SQLite reals, so no rounding appears
anywhere. Duplicate salary rows are ordinary rows: an employee paid twice
in one month weighs twice in both their department's average and the
company's, and repeated amounts matter only through those sums.

One grouping pass over the `S` rows of `Salary` builds each side, and the
join matches the `D` department-month groups against the `M` months.

**Complexity:** `O(S + D + M)` time, `O(D + M)` space.
