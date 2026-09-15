# Solutions — Biggest Window Between Visits

One alignment answers the question: line each visit up with the visit
right after it for the same user — `LEAD` supplies the successor, and a
fixed `'2021-01-01'` stands in for today on the last visit — so each
user's `biggest_window` is the longest of those gaps, in days.

## Pair each visit with its successor, keep the longest gap

`LEAD(visit_date) OVER (PARTITION BY user_id ORDER BY visit_date)` walks
each user's visits in date order and attaches the next visit's date to
every row; the last visit of a user has no successor, so its `LEAD` is
NULL. Day counts come from `julianday`, which maps an ISO date to its
Julian day number: the difference of two dates is exactly the number of
days between them. Both values carry the same half-day offset (midnight
lands on `.5`), so it cancels in the subtraction, and
`CAST(... AS INTEGER)` pins the whole-day result to an integer — the
example reports `39`, `65`, and `51`, not `39.0`.

The NULL successor is where today enters: `COALESCE(next_date,
'2021-01-01')` replaces it with the statement's fixed date. Today must be
a constant written into the query — the judge has no clock — never
`date('now')`. `GROUP BY user_id` with `MAX(...)` then keeps each user's
longest window as `biggest_window`. The table has no primary key, so a
user may hold duplicate rows on one date; such a row leads to its twin
and scores a 0-day window, which `MAX` ignores unless every window is 0 —
a user whose only visits land on today itself answers 0. `ORDER BY
user_id` finishes the query with the required ordering — the judge
compares result multisets, so that ordering is a statement requirement
rather than a comparison one.

**Complexity:** `O(n log n)` time (sort + scan), `O(n)` space.
