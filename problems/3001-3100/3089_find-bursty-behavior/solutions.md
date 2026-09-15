# Solutions — Find Bursty Behavior

## Per-user windows by self-join, filtered by half the monthly total

The analysis window is February 1–28 only — the note pins the month at
exactly four weeks and drops February 29 — so the `feb` CTE filters the
table to that range first, and every later figure derives from it. Each
user's average weekly frequency is then their February post count divided
by 4 (`totals`), and "twice the average" of `total` posts is simply
`total / 2`: a user is bursty when some 7-day window holds at least half
of everything they posted that month.

The busiest window is found by anchoring a window at every post: `windows`
self-joins `feb` so each row `a` counts the posts `b` of the same user in
`[a.post_date, a.post_date + 6 days]` — `DATE(post_date, '+6 days')` closes
the seven-day span. Any seven-day window holding posts can be slid right
until its first day lands on the earliest post it contains — the days
lost hold nothing, so no count shrinks — meaning anchoring at posts visits
a window at least as full as the true maximum, and `best` takes `MAX`
over each user's anchored counts. Posts sharing a date all anchor the same
window, so the count is `COUNT(DISTINCT b.post_id)` — a plain `COUNT(*)`
would scale each window by the number of same-day anchors, and the
grouping by `(user_id, post_date)` collapses those duplicate anchors into
one row while the distinct count keeps the window's true size, same-day
bursts included.

The final select joins `totals` with `best`, keeps users whose
`max_7day_posts >= total * 2.0 / 4`, and emits `avg_weekly_posts` as
`total * 1.0 / 4` — a real division, since the average (0.25, 0.75, 1.25,
...) is rarely integral. With `n` February posts, `u` distinct users and `w` posts for the busiest
user, the self-join pairs each post with its user's 7-day successors —
`O(w²)` comparisons in the worst single-user case — and the aggregation is
linear beyond it.

**Complexity:** `O(n + w²)` time, `O(n)` space, `w` the largest per-user
post count.
