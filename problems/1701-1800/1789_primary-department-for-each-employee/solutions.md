# Solutions — Primary Department for Each Employee

The table holds one row per (employee, department) membership with a
`Y`/`N` primary flag, and a row belongs in the answer when it is marked
`'Y'` or when it is that employee's only membership — so the shape is a
filtered selection whose predicate consults a per-employee count.

## Flag or sole membership

The `WHERE` clause keeps a row when `primary_flag = 'Y'`, or when the
employee appears in exactly one row — computed by a `GROUP BY
employee_id` subquery with `HAVING COUNT(*) = 1` and tested via `IN`.
The two disjuncts are independent: a sole-department employee's row
survives through the count even though its flag reads `'N'` (the
statement's note), and an employee who belongs to several departments
contributes exactly the rows they marked primary — all of them when the
data marks several, none when it marks none. Every output row is a
surviving input row, so no outer grouping is needed, and the result
order is free under the multiset comparison.

On the example rows: employees 1 and 3 each hold a single `'N'`-flagged
row, so the count admits both; employees 2 and 4 pass their one `'Y'`
row through the flag test while their other memberships do not.

**Complexity:** `O(n)` time, `O(n)` space.
