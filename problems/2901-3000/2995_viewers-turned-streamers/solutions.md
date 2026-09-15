# Solutions — Viewers Turned Streamers

Rank each user's sessions once, then count their streams.

## First session by window rank, joined to per-user stream counts

The query splits the problem into two independent summaries of `Sessions`.
The `firsts` CTE numbers every session within its user from earliest to
latest — `ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY session_start,
session_id)` — so the row with `rn = 1` is the user's first session, with
`session_id` breaking an earliest-start tie deterministically. The
`totals` CTE aggregates separately: filtering to `session_type =
'Streamer'` and counting per `user_id` yields every user that streams at
all, together with their streaming-session count. Users with zero
streaming sessions simply never enter this CTE.

The outer query keeps the `rn = 1` rows whose type is `'Viewer'` — the
viewer-first users — and inner-joins them to `totals`. That single join
enforces both remaining rules at once: a viewer-first user with no
'Streamer' session has no `totals` row, so the join drops them exactly as
the statement requires, while a viewer-first user with `k` streaming
sessions passes through with `sessions_count = k`. The `session_end`
column never matters; only the start times drive the ordering.

`ORDER BY sessions_count DESC, user_id DESC` finishes the contract, and
because `user_id` is unique in the output the sort is total. Each CTE is
one pass over the table — a per-user sort for the window numbering and a
linear grouped count — and the join touches one row per qualifying user,
so with `n` sessions the whole query is dominated by the window's
per-partition sort.

**Complexity:** `O(n log n)` time, `O(n)` space.
