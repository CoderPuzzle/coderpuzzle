# Solutions — User Activity for the Past 30 Days I

## Filter the window, then count distinct users per day

The window is fixed and closed on both ends: the 30 days ending
2019-07-27 run from 2019-06-28 through 2019-07-27, so a `BETWEEN` on
`activity_date` keeps exactly those rows. Every activity type counts, so no
predicate on `activity_type` is needed.

Grouping the survivors by date and counting `DISTINCT user_id` gives the
per-day active count: a user with several activities (or duplicate rows) on
one day still contributes 1. Days with no rows never form a group — the
example's rule that zero-user days are simply absent.

**Complexity:** `O(N)` time over `N` Activity rows — one filtered grouped
scan with a per-group user set — and `O(U)` space per day group.
