# Solutions — Find Total Time Spent by Each Employee

One grouping answers the question: fold `Employees` on the
(`event_day`, `emp_id`) pair, and each group's `total_time` is the sum of
its rows' per-entry durations, `out_time - in_time`.

## Group per employee per day and sum the durations

Every row already carries the duration it represents — `out_time - in_time`
is the minutes one office visit lasted. `GROUP BY event_day, emp_id`
collapses all of an employee's rows on one day into a single group, and
`SUM(out_time - in_time)` totals those durations, so the repeated
enter/leave cycles the statement allows add up inside the group: example 1's
employee 1 on `2020-11-28` totals `(32 - 4) + (200 - 55) = 173` across two
rows. Nothing is double-counted or lost — the (`emp_id`, `event_day`,
`in_time`) primary key makes each row a distinct visit, so every row
contributes its duration exactly once.

`event_day AS day` renames the grouped date to the output column the answer
asks for and positions it first, so each result row comes out as (`day`,
`emp_id`, `total_time`). The statement allows the result in any order, so
the query carries no `ORDER BY` — the judge compares result multisets, and
row order cannot fail a case.

**Complexity:** `O(n)` time, `O(g)` space (g groups).
