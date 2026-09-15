# Solutions — Find the Start and End Number of Continuous Ranges

## Group by the gap count, then take MIN and MAX per group

Two ids belong to the same continuous range exactly when every id between
them is present, which a self-join can test but at quadratic cost. The
linear trick is to notice that within a run of consecutive ids, subtracting
each id's rank among the sorted rows — its row number, starting at 1 —
leaves a constant: `1-1=0`, `2-2=0`, `3-3=0` share one key while the next
run `7-4=3`, `8-5=3` shares another. Each missing id bumps every later
row's number by one more than it bumps `log_id`, so the difference
identifies the run and never collides across runs.

So the query numbers the rows in id order with a window function,
groups by that `log_id - row number` difference, and reads each range's
boundaries straight off the group: `MIN(log_id)` as `start_id`,
`MAX(log_id)` as `end_id`. One scan, one sort, one aggregation — no joins.

**Complexity:** `O(n log n)` time for the ordering pass over `n` log rows
(the grouping itself is `O(n)`), `O(n)` space.
