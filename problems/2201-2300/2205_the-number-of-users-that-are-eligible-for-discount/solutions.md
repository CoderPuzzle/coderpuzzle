# Solutions — The Number of Users That Are Eligible for Discount

Eligibility is a per-row conjunction — a purchase inside the time window and
of at least the amount threshold — and the answer counts the distinct users
for which at least one row passes, so one filtered aggregate answers the
whole question.

## Filter the rows, then count distinct users

The `WHERE` clause keeps exactly the purchases with
`time_stamp` inside `[2022-03-08 00:00:00, 2022-03-20 00:00:00]` and
`amount >= 1000`. Writing the bounds as full timestamps is what makes the
endpoints inclusive: the statement reads each date at the start of its day,
and comparing against `'2022-03-20 00:00:00'` admits a purchase at exactly
that instant while still excluding `2022-03-20 09:43:42`. Timestamps in
`YYYY-MM-DD HH:MM:SS` form also order lexicographically the same as they do
chronologically, so the two string comparisons implement the interval
exactly.

`COUNT(DISTINCT user_id)` then collapses the surviving rows: a user with
several qualifying purchases — or with qualifying and non-qualifying ones —
is counted once, and a user whose only purchases miss either condition is
not counted at all. The aggregate always returns exactly one row, so the
empty-table case yields `user_cnt = 0` rather than no rows.

**Complexity:** `O(n)` time, `O(n)` space.
