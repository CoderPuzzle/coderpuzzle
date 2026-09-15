# Solutions — Snaps Analysis

## Conditional aggregation over the joined buckets

Each activity must reach its owner's age bucket before anything
aggregates: an inner join `FROM Activities a JOIN Age g ON a.user_id =
g.user_id` attaches `age_bucket` to every activity whose user exists in
both tables, and silently drops the two degenerate populations —
activities of users the `Age` table never heard of, and users with no
activities at all. Grouping the surviving rows by `age_bucket` collapses
them into one group per bucket that still carries activity time; a
bucket whose every user is inactive never forms a group, so it produces
no output row without any special-casing.

Inside a group the send/open split is conditional aggregation:
`SUM(CASE WHEN a.activity_type = 'send' THEN a.time_spent ELSE 0.0 END)`
totals the sending time while `SUM(a.time_spent)` totals everything, so
each percentage is that part divided by the whole, scaled by 100 and
squeezed through `ROUND(..., 2)` per the statement. A bucket whose users
only ever sent reports `open_perc = 0.0` honestly rather than losing a
column, and SQLite's `ROUND` returns a REAL even when the value is whole,
matching the expected numbers exactly. The judge compares result rows as
an unordered multiset, so no `ORDER BY` is needed.

**Complexity:** `O(A + U)` time for `A` activity rows and `U` `Age` rows
— the join probes one side against the other and the grouping is linear
in the join output — and space proportional to the join result plus one
accumulator per bucket group (at most three distinct buckets).
