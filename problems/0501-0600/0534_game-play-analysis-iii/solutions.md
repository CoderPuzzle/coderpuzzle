# Solutions — Game Play Analysis III

## Window Function Running Sum

The request is a running total of `games_played` per player in date order, with every login row kept in the output — precisely the shape of an ordered window aggregate. The query selects each row of `Activity` and computes `SUM(games_played) OVER (PARTITION BY player_id ORDER BY event_date)`: the partition isolates each player's history, and the ordering with the default frame (unbounded preceding through the current row) accumulates all of that player's earlier rows plus the row being read.

No `GROUP BY` is wanted or needed — grouping would collapse each player's logins into one summary row, while the window function annotates every row in place. The primary key on `(player_id, event_date)` guarantees at most one row per player per day, so the running sum is deterministic and each `(player, date)` pair appears exactly once, exactly as the expected output shows. The column is aliased to `games_played_so_far` to match the required schema.

Only days the player actually logged in appear, because the query only ever transforms existing rows — it never synthesizes calendar rows. Ordering matters only within a partition, and since dates are distinct per player, ties never arise; with `n` rows in the table, the engine sorts within partitions to feed the window.

**Complexity:** `O(n log n)` time, `O(n)` space.
