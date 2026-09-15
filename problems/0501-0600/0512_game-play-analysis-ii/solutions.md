# Solutions — Game Play Analysis II

## The earliest row per player

The device to report for each player is the device named on that player's
earliest-dated `Activity` row, so the task splits in two: find each
player's first date, then keep the row that carries it. The first half is
a grouped aggregate — `GROUP BY player_id` gathers a player's scattered
logins into one group and `MIN(event_date)` reduces them to the earliest —
and the second half is a membership test on row values:
`(player_id, event_date) IN (SELECT player_id, MIN(event_date) FROM
Activity GROUP BY player_id)` keeps exactly the rows whose (player, date)
pair equals their own player's minimum, and `device_id` rides along on
the surviving row.

Matching the pair, not the date alone, is what makes the test correct: a
player's later login can land on a date that is a different player's
first, so a bare `event_date IN (...)` would leak those later rows in.
The pair binds each row to its own player's minimum, and because
`(player_id, event_date)` is the primary key that minimum pair is unique
per player — one output row each follows with no `DISTINCT`. The minimum
itself needs no date conversion: `event_date` values are ISO
`YYYY-MM-DD` strings whose fixed-width, zero-padded fields sort
lexicographically in calendar order, so `MIN` over the text is already
the earliest date. Equivalent shapes reach the same rows — joining
`Activity` against the grouped minima on both `player_id` and
`event_date`, filtering `ROW_NUMBER() OVER (PARTITION BY player_id ORDER
BY event_date) = 1`, or a correlated re-derivation of each player's
minimum per row — but the row-value `IN` states the keep-set directly.

One aggregation pass over the `A` rows of `Activity` materializes the
`P` group minima; the outer scan performs one pair-membership test per
row and emits one output row per player.

**Complexity:** `O(A)` time, `O(P)` space.
