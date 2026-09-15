# Solutions — Merge Overlapping Events in the Same Hall

Two events in the same hall merge exactly when they share at least one
day, which for inclusive date ranges is `next.start_day <= current.end`.
So, within each hall, the merged groups are the classic interval
union, and the rows are independent across halls.

## Running-max window per hall

Order each hall's rows with `ROW_NUMBER()` (ties on identical dates are
broken by `rowid`, which keeps duplicates in a deterministic order), then
slide a window over the previous rows to compute the farthest `end_day`
seen so far in the current run. A row starts a brand-new merged group
exactly when its `start_day` is strictly greater than that running
maximum — if it is `<=`, it shares a day with the run and only extends
the run's end. The first row of a hall has no previous window, so the
`COALESCE` treats it as its own boundary and opens a group.

A cumulative `SUM` of the "starts new group" flag over the hall turns
those boundaries into a group id per row. Grouping by `(hall_id, gid)`
and taking `MIN(start_day)` / `MAX(end_day)` yields the merged events:
the earliest start and the latest end of every maximal overlapping
chain. Duplicate rows collapse naturally, since an identical row can
never be past the running maximum and always lands in its copy's group.

**Complexity:** `O(N log N)` time (the sort per hall) and `O(N)` space,
where `N` is the number of rows in `HallEvents`.
