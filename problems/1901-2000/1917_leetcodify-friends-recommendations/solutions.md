# Solutions — Leetcodify Friends Recommendations

A recommendation needs two facts to hold at once: a shared listening history
(three or more distinct songs on one common day) and the absence of a
friendship. The query therefore builds the shared-history pairs first, then
subtracts the friend edges, and finally reflects every surviving pair in both
directions.

## Self-join, per-day count, anti-join, both directions

The `common` CTE joins `Listens` against itself on equal `song_id` and equal
`day` with `l1.user_id < l2.user_id` — the strict inequality kills
self-pairs and canonicalizes each unordered pair with its smaller id first,
which matters later because `Friendship` stores exactly that orientation.
`DISTINCT` collapses the duplicate rows the schema allows, so a song heard
together twice on one day still counts once.

The qualification is day-scoped: `qualifying` groups by `(u1, u2, d)` and
keeps groups with `COUNT(DISTINCT s) >= 3`, which reads "some single day on
which both users heard at least three common songs". Grouping by the day is
what the statement's example demands — two users who shared one song on
Saturday and two more on Sunday are not recommended. `pairs` then deduplicates
across days (a pair qualifying on several days still emits one row per
direction) and drops friend edges via `NOT EXISTS`, probing `Friendship` in
its stored `user1_id < user2_id` orientation. The final `UNION ALL` reflects
each pair both ways, giving the unidirectional recommendations the statement
asks for.

The self-join is quadratic in the listeners a popular (song, day) attracts,
but each step only pairs up rows that already agree on the join keys, so the
work stays proportional to the produced matches — comfortably inside the
limits at the corpus sizes.

**Complexity:** `O(L²)` time in the worst case over matching (song, day)
groups, `O(L²)` space for the join output.
