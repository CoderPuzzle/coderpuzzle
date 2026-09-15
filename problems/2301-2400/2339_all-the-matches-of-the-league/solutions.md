# Solutions — All the Matches of the League

## Self-join the table against itself, keep opposite rows

The answer lives at the pair grain while the input sits at the team
grain, so the table is joined to itself: `Teams a` proposes every home
candidate, `Teams b` every away candidate, and the join condition
`a.team_name <> b.team_name` keeps exactly the ordered pairs of distinct
teams. The inequality is what does all the work — it discards the
identity pairs `(t, t)` the cross product would otherwise emit, and it
leaves both orientations of every fixture in place, which is precisely
the two-legged format: `(x, y)` and `(y, x)` are different matches and
both must be reported.

Because `comparison` is a multiset over two columns, any row order is
accepted; nothing needs an `ORDER BY`. An empty or single-team league
has no pair of distinct teams to join on, so the result is empty —
which is correct, not degenerate.

The self-join materializes the full n x n cross product before
filtering, producing `n^2` candidate combinations of which the answer's
`n * (n - 1)` rows survive; each surviving row is emitted directly with
no aggregation or sort on top.

**Complexity:** `O(n^2)` time, `O(n^2)` space.
