# Solutions — Reported Posts II

## Per-day spam percentage, then one average

The inner query reduces `Actions` to one row per spam-reporting day. A
`LEFT JOIN` onto `Removals` marks each spam-reported post removed or not —
left, because a post that still stands has no Removals row and must survive
the join rather than vanish. Counting `DISTINCT post_id` in the group gives
the day's spam-post denominator; `COUNT(DISTINCT CASE WHEN r.post_id IS NOT
NULL THEN a.post_id END)` gives the removed numerator, since the CASE
collapses to NULL (which COUNT skips) for posts that were never removed.
Multiplying by `100.0` rather than `100` keeps the division in floating
point.

Days without any spam report form no group at all, which is exactly the
statement's rule that they are not part of the average — the example counts
only `(50 + 100) / 2`, ignoring the spam-free days entirely. The outer
query then averages the daily percentages with `AVG` and rounds to two
decimal places. Remove dates never enter the computation; Removals is
consulted only for the existence of a row per post.

**Complexity:** `O(N)` time over the `N` Actions rows joined once against a
primary-keyed Removals lookup, `O(D × P)` space for `D` days and their
distinct spam posts.
