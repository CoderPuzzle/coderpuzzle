# Solutions — Leetcodify Similar Friends

Similarity here is the intersection of two facts already stored separately:
a friendship edge, and a shared listening history — three or more distinct
songs on one common day. The query builds the shared-history pairs first,
then keeps only those that exist as friendship edges.

## Self-join, per-day count, friend join

The `common` CTE joins `Listens` against itself on equal `song_id` and equal
`day` with `l1.user_id < l2.user_id` — the strict inequality kills self-pairs
and canonicalizes each unordered pair with its smaller id first, which is
exactly the orientation `Friendship` stores. `DISTINCT` collapses the
duplicate rows the schema allows, so a song heard together twice on one day
still counts once.

The qualification is day-scoped: `qualifying` groups by `(u1, u2, d)` and
keeps groups with `COUNT(DISTINCT s) >= 3`, which reads "some single day on
which both users heard at least three common songs". Grouping by the day is
what the statement's example demands — friends who shared one song on
Saturday and two more on Sunday are not similar. The final step joins
`qualifying` against `Friendship` on the stored orientation (`DISTINCT`
absorbs pairs that qualified on several days), so each similar pair survives
exactly once as `user1_id` < `user2_id`, matching the input representation.

The self-join is quadratic in the listeners a popular (song, day) attracts,
but each step only pairs up rows that already agree on the join keys, so the
work stays proportional to the produced matches — comfortably inside the
limits at the corpus sizes.

**Complexity:** `O(L²)` time in the worst case over matching (song, day)
groups, `O(L²)` space for the join output.
