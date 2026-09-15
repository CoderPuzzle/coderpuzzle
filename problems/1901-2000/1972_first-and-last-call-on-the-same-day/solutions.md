# Solutions — First and Last Call On the Same Day

## Unfold each call into both directions, then compare day extrema

Every call involves two users, and "first and last call of the day" must
consider both the caller and the recipient. The query therefore unfolds
each `Calls` row into two directional rows — one from the caller's
perspective and one from the recipient's — via `UNION ALL`. Each row now
carries a `user_id` (the person whose schedule we are examining) and an
`other_id` (the person on the other end).

A CTE groups the unfolded rows by `user_id` and calendar day,
`DATE(call_time)`, and pulls the day's `MIN(call_time)` and
`MAX(call_time)`. Joining that summary back to the unfolded rows on
`user_id` plus the exact boundary timestamp recovers the counterparty of
the first call and of the last call; the final `WHERE` keeps a day only
when those two counterparties are the same person. `SELECT DISTINCT`
emits each qualifying user once, and a user qualifies as soon as any one
day satisfies the condition.

The join on the bare timestamp is enough to stay within the right day,
because each timestamp maps to exactly one calendar date. A single-call
day needs no special case: its minimum and maximum are the same timestamp,
so both joins land on the same call and the counterparties trivially agree.

**Complexity:** `O(n log n)` time, `O(n)` space, where `n` is the number
of `Calls` rows.
