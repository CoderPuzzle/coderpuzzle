# Solutions — Game Play Analysis V

## Install date per player, then left-join the next day

A player's install date is their earliest login, so the first step
groups `Activity` by `player_id` and takes `MIN(event_date)`. That gives
one row per installed player; counting those rows per date answers "how
many players installed on each day".

Day-one retention then asks, for each install date, how many of those
players logged back in exactly one day later. A `LEFT JOIN` of the
install-date rows back onto `Activity` matches each player's install
date against an activity row whose date is `install_dt + 1 day`. Because
`(player_id, event_date)` is a primary key, a player has at most one
activity row per date, so the join can match each player at most once
and never double-counts. `SUM` over the matched rows counts retained
players, dividing by the install count and rounding to two decimals
gives the day-one retention.

The grouping and join each touch every `Activity` row once, so the query
runs in one pass over the table.

**Complexity:** `O(N)` time and `O(N)` space, for `N` Activity rows.
