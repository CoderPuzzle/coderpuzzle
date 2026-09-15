# Solutions — Find Users with Persistent Behavior Patterns

The definition is a gaps-and-islands problem in disguise: first discard
the days that cannot belong to any streak, then cut each user's
remaining same-action days into maximal runs of consecutive calendar
dates, and finally keep each user's longest qualifying run.

## Island grouping on consecutive same-action days

`single_days` collapses the table to one row per `(user_id, action_date)`
and keeps only groups of size one, which is the definition's "exactly one
action per day" read directly off the data: the primary key already rules
out duplicate identical rows, so a group of two or more is a day on which
the user performed several different actions, and such a day can never be
inside a streak. `ranked` then numbers the surviving days per
`(user_id, action)` in date order, and subtracting that rank from the date
— `DATE(action_date, '-' || rn || ' days')` — yields the island key: on a
run of consecutive days the date advances by exactly one day per row, so
date minus rank stays constant on the run and jumps across any gap.

`streaks` groups by `(user_id, action, key)`, so each group is one maximal
run: `COUNT(*)` is its length, and `MIN(action_date)`/`MAX(action_date)`
its span (ISO `YYYY-MM-DD` text sorts chronologically). `HAVING
COUNT(*) >= 5` applies the minimum-streak threshold, and `best` keeps one
row per user with `ROW_NUMBER() ... ORDER BY streak_length DESC,
start_date ASC, action ASC` — the maximum-length rule; the last two keys
only make the winner deterministic in the degenerate case of a user with
two equal-longest streaks. The final `ORDER BY streak_length DESC,
user_id ASC` produces the required output ordering.

SQLite evaluates the whole chain as a grouped pass, a window sort, and an
aggregation over the surviving days — a logarithmic sort factor over one
scan of the table, with the islands held in memory before the per-user
pick reduces them to one row each.

**Complexity:** `O(n log n)` time, `O(n)` space.
