# Solutions — Find Emotionally Consistent Users

The question decomposes into two independent grouped passes over
`Reactions` — one per user, one per user-and-reaction — that a small
join stitches back together under the two inclusion rules.

## Two grouped passes joined per user

The first pass, `per_user`, collapses the table to one row per user and
reads both counters the statement names: `COUNT(DISTINCT content_id)` is
how many different content items the user reacted to (the `>= 5` gate),
and `COUNT(*)` their total reaction count. The second pass,
`per_reaction`, groups one level finer — per `(user_id, reaction)` — so
its `COUNT(*)` is each reaction type's tally. Neither pass needs the
other; both are plain single-table aggregations.

The join then enforces the 60% rule without any `MAX`, ranking, or
window: if a single reaction type reaches 60% of a user's reactions, it
is automatically their dominant type, because two types cannot both hold
at least 60% of the same total — they would sum past 100%. So matching
each `(user, reaction)` tally against its user's total and keeping only
`cnt * 1.0 / reaction_cnt >= 0.6` leaves at most one surviving row per
user, and that row's `reaction` is the `dominant_reaction`. The
`* 1.0` promotes the division to floating point before both the
comparison and `ROUND(..., 2)`, so `reaction_ratio` is a REAL like
`0.80` rather than an integer-truncated `0`. Finally
`ORDER BY reaction_ratio DESC, user_id ASC` yields the required
ordering.

SQLite answers each `GROUP BY` with one ordered pass over the table and
then probes at most a handful of tally rows per user, so the whole query
is two aggregation sorts plus a small join — logarithmic factors over a
single scan, with one accumulator set per user and per user-reaction
pair in memory.

**Complexity:** `O(n log n)` time, `O(n)` space.
