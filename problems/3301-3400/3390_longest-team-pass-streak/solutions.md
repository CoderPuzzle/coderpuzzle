# Solutions — Longest Team Pass Streak

## Islands of consecutive successes, sized per team

A team's pass history — every pass whose `pass_from` sits on the team,
joined to the receiver's team name and marked successful or intercepted —
is one stream ordered by timestamp (with `pass_from`, `pass_to` as a
deterministic tiebreak). Within that stream the successful passes form
islands separated by failures, and a windowed running count of failures,
`SUM(ok = 0) OVER (PARTITION BY team ORDER BY ... ROWS UNBOUNDED
PRECEDING)`, gives every success the number of failures suffered so far:
successes between the same pair of failures share the count, so it keys
the islands exactly. `COUNT(*) OVER (PARTITION BY team, that key)` then
sizes each island — the streak length ending at each success.

The outer query keeps the roster in charge: `Teams` LEFT JOINed to those
sized rows and `MAX(...)` per team picks the longest run, with `COALESCE`
turning the empty join of a never-successful team into `0`. The result is
one row per roster team, ordered by name — the row the statement's
comparison expects, interception passes themselves scoring for nobody
while resetting only the passer's own streak.

**Complexity:** `O(P log P)` time, `O(P)` space — `P` passes, sorted once
by the window machinery.
