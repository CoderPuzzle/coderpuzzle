# Solutions — The Latest Login in 2020

The task filters rows to the year 2020 and collapses each surviving
user to their maximum timestamp — one filtered aggregation over the
`Logins` table.

## Filtered MAX group by

Select `user_id` and `MAX(time_stamp) AS last_stamp` from `Logins`
where `time_stamp` falls inside 2020 (`>= '2020-01-01'` and
`< '2021-01-01'`), grouped by `user_id`. The half-open interval keeps
the boundary semantics exact: logins on New Year's Eve 23:59:59 are in,
the 2021 New Year moment is out.

Grouping by `user_id` folds every surviving row of a user into one
bucket, and the aggregate `MAX(time_stamp)` picks the latest login among
them. Because the timestamps are stored in ISO-8601 order, the string
maximum is also the chronological maximum, so no parsing or date
arithmetic is needed. Users with no 2020 login never appear in a grouped
result, which is precisely the exclusion the statement asks for.

**Complexity:** `O(n log n)` time, `O(n)` space, where `n` is the number
of rows in `Logins`.
