# Solutions — The Users That Are Eligible for Discount

## Filter rows by the window and threshold, keep distinct users

Eligibility is a per-row conjunction — a purchase whose `time_stamp` falls
inside `[2022-03-08 00:00:00, 2022-03-20 00:00:00]` (both endpoints
inclusive) with `amount >= 1000` — so a single filtered pass over the table
finds every qualifying purchase. Writing the bounds as full timestamps makes
the inclusiveness exact: dates read as start-of-day turn into these precise
instants, and `YYYY-MM-DD HH:MM:SS` strings order lexicographically exactly
as they do chronologically.

`SELECT DISTINCT user_id` then collapses qualifying purchases to the set of
users, ordered by `user_id`. A user with several qualifying purchases
appears once; a user whose only purchases each miss one condition appears
never. An empty or fully disqualified table returns no rows rather than a
padded result — exactly the required shape.

**Complexity:** `O(n)` time, `O(n)` space.
