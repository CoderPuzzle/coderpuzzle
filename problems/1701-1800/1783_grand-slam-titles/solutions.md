# Solutions — Grand Slam Titles

The wins live in four separate columns of `Championships`, one row per
year, and the answer needs each player's total across all of them plus
the player's name — so the shape is an unpivot into one row per title,
followed by a grouped count joined back to `Players`.

## Unpivot then count

Each `Championships` row holds four winner ids, so a `UNION ALL` over
four single-column `SELECT`s rebuilds the implicit one-row-per-title
table. `UNION ALL` rather than `UNION` is load-bearing: duplicates must
survive, because a player who sweeps all four tournaments of one year
has won four titles, not one. Joining that stream to `Players` on
`player_id` — an inner join — carries the name onto every title row and
drops the players who never appear as a winner, which is exactly the
required exclusion; each lookup probes the table's primary key.
`GROUP BY player_id, player_name` collapses each player's title rows
into one group (the name rides along so the selection stays valid under
strict grouping), and `COUNT(*)` — one per surviving title row — is the
count. The result order is free under the multiset comparison.

With `t` title entries (four per `Championships` row) and `p` players,
the unpivot emits `t` rows, each resolved through the primary-key index,
and the grouping sorts them once.

**Complexity:** `O(t log p)` time, `O(p)` space.
