# Solutions — Calculate Salaries

## Per-company maximum drives the rate, applied with ROUND

The tax rate belongs to the company, not the employee, so the first step
is a `GROUP BY company_id` subquery producing each company's maximum
salary. Joining it back to the raw rows attaches that maximum to every
employee of the company, and a `CASE` maps it to the rate: below 1000 the
`0.0` arm leaves salaries untouched, the `[1000, 10000]` inclusive band
takes `0.24`, and anything above takes `0.49`.

The taxed salary is `ROUND(salary * (1 - rate))` — SQLite's `ROUND`
rounds halves away from zero, which matches the statement's
"rounded to the nearest integer" with `5910.52 → 5911` (and would send
`5910.5` up to `5911` as well). Everything stays in one pass: the group
scan is linear, the join is on the company key, and the output keeps the
original columns with the salary replaced.

Row order is free ("in any order"), which the multiset comparison
accepts.

**Complexity:** `O(n)` for the grouping plus the join, `O(n)` space.
