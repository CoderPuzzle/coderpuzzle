# Solutions — Restaurant Growth

## Approach: Self-join over the day axis

The window is defined on calendar days, not rows, so amounts are first
collapsed to one row per day (`GROUP BY visited_on`), and each day `d1` is
joined against every daily total `d2` whose day lies in
`[d1 - 6 days, d1]` — SQLite's `DATE(d1.visited_on, '-6 day')` performs the
calendar arithmetic. `SUM(d2.amount)` then totals the seven-day window and
`ROUND(SUM(d2.amount) / 7.0, 2)` produces the two-decimal average; the
division by `7.0` (a real, not integer division) keeps the fraction.

Only complete windows count: the first six days of the table have fewer
than seven distinct days behind them, so `HAVING COUNT(*) = 7` drops them —
exactly the statement's "current day + 6 days before" reading, where the
output starts on the seventh day. The final `ORDER BY visited_on` meets the
required ascending order.

With `D` distinct days the join pairs each day with at most 7 others, so
the work is `O(D)` window sums over the grouped table.

**Complexity:** `O(D · 7)` time, `O(D)` space, `D` = number of distinct days.
