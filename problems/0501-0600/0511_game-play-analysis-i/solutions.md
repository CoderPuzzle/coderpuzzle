# Solutions — Game Play Analysis I

## Min event date per player

The answer is one row per player carrying that player's earliest login
date, which is exactly a grouped aggregate: `GROUP BY player_id` gathers
each player's scattered rows into one group, and `MIN(event_date)` reduces
the group's dates to its earliest. Every `Activity` row records a login —
`games_played` may be 0 and the row still counts, and `device_id` plays no
part in the grouping — so the group minimum is by definition the player's
first login, and the pair `(player_id, first_login)` leaves once per group.

The minimum needs no date arithmetic because the encoding already agrees
with the calendar: `event_date` values are ISO `YYYY-MM-DD` strings, whose
fixed-width, zero-padded fields sort lexicographically in chronological
order, so `MIN` over the text is the earliest date with no `DATE()`
conversion. Equivalent shapes reach the same rows: the window
`MIN(event_date) OVER (PARTITION BY player_id)` repeats the minimum on
every row of the player and so needs an extra `DISTINCT` to collapse back
to one row each, and the correlated
`(SELECT MIN(event_date) FROM Activity a2 WHERE a2.player_id =
Activity.player_id)` re-derives each player's minimum once per row — the
plain grouped aggregate states the collapse directly.

A single aggregation pass reads the `A` rows of `Activity` once and
materializes one output row per player, `P` of them; nothing beyond the
per-group minimum is retained.

**Complexity:** `O(A)` time, `O(P)` space.
