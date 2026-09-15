# Solutions — Department Top Three Salaries

## Dense rank the unique salaries per department

The definition runs over distinct values, not rows: a high earner is an employee whose salary is one of their department's three highest _unique_ salaries. `DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC)` numbers exactly those values — inside each department partition it walks the salaries from the top and assigns 1 to the highest distinct value, 2 to the next distinct value, and so on, giving every employee tied at a value the same rank. Because the ranking is dense, a tie neither consumes extra ranks the way `ROW_NUMBER()` would nor skips one the way `RANK()` would: 100000, 100000, 90000 earns ranks 1, 1, 2, and the third-highest unique salary always carries rank 3 however many employees sit at it. Filtering `rnk <= 3` is then literally the definition — everyone tied at a top-three unique salary is kept, whole ties at the third value included, and a department holding fewer than three unique salaries keeps every employee it has.

The rank is computed in a derived table because the filter needs the window's output: a window function is evaluated after grouping but before `WHERE`, so `rnk <= 3` can only be applied one query level up from the `DENSE_RANK()` call. The ranked rows then join `Department` on `e.departmentId = d.id` to attach the department name — employees whose `departmentId` has no `Department` row match nothing and drop out, and a department with no employees contributes no rows at all. The projection emits the three requested columns: `d.name AS Department`, `e.name AS Employee`, and `e.salary AS Salary`.

The window pass sorts each department partition, so `E` employee rows cost `O(E log E)`, and the join probes each ranked row against `Department` once; the derived table materializes one ranked row per employee.

**Complexity:** `O(E log E)` time, `O(E)` space.
