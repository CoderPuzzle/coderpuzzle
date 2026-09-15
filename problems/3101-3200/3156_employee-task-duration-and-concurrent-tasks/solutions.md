# Solutions — Employee Task Duration and Concurrent Tasks

## Sweep the interval endpoints with window aggregates

Two per-employee aggregates over raw rows, each computed by one ordered window
pass. The busy time is the length of the union of a task list: when tasks are
processed in start order, only each task's intersection with work already
accounted for must be dropped. `ordered` reads, above every row, the running
`MAX(end_time)` of all earlier tasks of the same employee — `ROWS BETWEEN
UNBOUNDED PRECEDING AND 1 PRECEDING` — and `busy` keeps from
`end_time - start_time` the part that lies beyond that frontier
(`prev_end`); on the first task of an employee `prev_end` is null. Because the
frontier only grows as rows stream past, a longer earlier task correctly masks
a later one that starts inside it, so nested and chained overlaps are handled
in a single scan without self-joins.

The concurrency peak falls out of the classic endpoint sweep: `events` turns
every task into a +1 step at its start and a -1 step at its end,
`sweep` accumulates those steps per employee with a `SUM(...) OVER` window in
moment order — the running total is exactly how many tasks are open at that
instant — and `peak` takes the maximum of that level per employee (the floor
of 1 is implicit: every employee's first event is its own +1). Finally the two
aggregates join on `employee_id`, seconds are floored to hours by integer
division (`SUM(seg_secs) / 3600`, both sides integers), and the result orders
by `employee_id`.

**Complexity:** `O(n log n)` time, `O(n)` space — the window functions sort
the `n` rows twice (by start time, by moment), everything else is linear.
