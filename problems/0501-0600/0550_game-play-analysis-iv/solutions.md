# Solutions — Game Play Analysis IV

## First logins, then the day after

The answer is one ratio — players who logged in again exactly one
calendar day after their first login, over all players — and both counts
come from the same grouping. `GROUP BY player_id` gathers each player's
scattered rows into one group and `MIN(event_date)` names their first
login, so the `first_logins` CTE carries one row per player; its player
count is the denominator. The day after the first login is calendar
arithmetic, not a row offset: `DATE(first_login, '+1 day')` resolves
month ends, year ends, and leap days to the true next day, and the
`LEFT JOIN` matches that date against `Activity` on both `player_id`
and `event_date` — the pair, not the date alone, binds the test to the
player's own history, so a login on the right date by a different player
never counts.

The join's NULL side carries the counting: `LEFT JOIN` keeps every
player — matched or not — while `COUNT(a.player_id)` skips the unmatched
rows' NULLs, making it the numerator, with
`COUNT(DISTINCT first_logins.player_id)` as the denominator.
`(player_id, event_date)` is the primary key, so at most one `Activity`
row matches each player and both counts are exact. `* 1.0` forces real
division — SQLite's integer `1/3` truncates to `0` — and `ROUND(x, 2)`
rounds the ratio to two decimals, ties going up (`1/8` is exactly
`0.125` and rounds to `0.13`). Equivalent shapes reach the same row — a
row-value membership test `(player_id, event_date) IN (SELECT
player_id, DATE(MIN(event_date), '+1 day') FROM Activity GROUP BY
player_id)` inside a `COUNT(*)`, or an `EXISTS` probe per first-login
row — but the join states the pairing directly.

One aggregation pass over the `A` rows of `Activity` materializes the
`P` first-logins; the join probes `Activity` once per player and a
single row leaves. With no index on the join key the engine may
nested-loop the probe at `O(A*P)` comparisons.

**Complexity:** `O(A)` time, `O(P)` space.
