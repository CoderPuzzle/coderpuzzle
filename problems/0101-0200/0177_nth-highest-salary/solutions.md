# Solutions — Nth Highest Salary

## Dense rank against the testcase's n

The request is positional over the _distinct_ salaries: order them from highest to lowest and take the one in position `n`, with `null` when fewer than `n` distinct values exist. `DENSE_RANK() OVER (ORDER BY salary DESC)` computes exactly that position on every row — duplicate salaries share a rank and, the ranks being dense, no position is ever skipped, so rank `n` is the nth distinct salary no matter how many duplicate rows precede it. The testcase's `n` is not a constant in the query; it arrives as data in the one-row `Params` table, so the filter compares the rank against the scalar subquery `(SELECT n FROM Params)`.

Filtering `rnk = n` leaves either every row holding that salary or nothing at all. Wrapping the filter in `MAX(salary)` collapses whichever remains into exactly one output row: the salary when it exists, and `null` — an aggregate over an empty set — for the "less than n distinct salaries" contract. The outer query is a plain aggregate, so its row count is fixed at one and no `LIMIT`/`OFFSET` arithmetic is needed.

Ranking sorts the salaries once; with `E` rows in `Employee` the window pass is one sort plus a linear scan, and the rank filter and aggregate are linear over the ranked rows. Only the ranked rows are materialized.

**Complexity:** `O(E log E)` time, `O(E)` space.
