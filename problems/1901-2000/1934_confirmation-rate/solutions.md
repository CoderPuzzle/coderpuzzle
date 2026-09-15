# Solutions — Confirmation Rate

Each user's confirmation rate is the average of a binary confirmed flag
over their confirmation requests.

## Left join, average the confirmed flag, round

Each user's rate is the fraction of their confirmation requests that came
back `'confirmed'`, so the query joins every signup to its confirmation
rows and averages a boolean flag over the group. The `LEFT JOIN` keeps
users who never requested a confirmation; for them the joined row carries
a `NULL` action, `AVG(c.action = 'confirmed')` evaluates to `NULL` (SQLite
averages only non-`NULL` values), and `COALESCE(..., 0)` supplies the rate
`0` the statement prescribes.

The boolean `c.action = 'confirmed'` is `1` for a confirmed row and `0`
for a timeout, so `AVG` is exactly the confirmed-to-total ratio, and
`GROUP BY s.user_id` computes one ratio per user. `ROUND(..., 2)` gives
the two-decimal form the statement requires, and because every user of the
`Signups` table appears through the left join, the result contains exactly
one row per signup — no user is dropped.

The query scans each table once to build the join, then groups; the row
set is compared against the expected table as an unordered set, matching
the statement's "in any order".

**Complexity:** `O(n log n)` time, `O(n)` space.
