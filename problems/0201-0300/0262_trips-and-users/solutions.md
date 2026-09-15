# Solutions — Trips and Users

## Double Join with Conditional Average

The rate denominator and numerator must both count only trips whose client _and_ driver are unbanned, so `Trips` is joined to `Users` twice — once through `client_id` (alias `uc`) and once through `driver_id` (alias `ud`) — with `banned = 'No'` folded into each join condition. Any trip with a banned participant loses its row in the inner joins and is excluded from both counters at once, which is exactly the definition. The `WHERE` clause restricts `request_at` to the three target days before grouping, so no out-of-range day can ever appear.

Grouping by `request_at` then reduces each day to one row, and the aggregation trick avoids computing two separate counts: `CASE WHEN status != 'completed' THEN 1 ELSE 0 END` marks each trip as cancelled (both `cancelled_by_client` and `cancelled_by_driver` are anything-but-completed) or not, so `AVG` of those 0/1 flags is literally cancelled-divided-by-total. `ROUND(..., 2)` formats the rate, and because `GROUP BY` only emits groups that have rows, days with at least one qualifying trip appear automatically — no explicit `HAVING` needed.

The query touches each qualifying trip row a constant number of times: two joins and one aggregation pass. With hash-based joins and grouping that is linear in the trip and user row counts (T and U); sort-based plans add a logarithmic factor. Working storage is the joined/grouped rows, and SQLite's `ROUND` returning a number means `0.00` and `0` compare equal in this judge.

**Complexity:** `O(T + U)` time, `O(T + U)` space.
