# Solutions — Premier League Table Ranking

## Window ranking over pre-aggregated records

The table hands over each team's finished season, so the points are a pure
per-row expression — `3 * wins + draws`, with losses worth nothing — and
no join or aggregation is needed to produce them. The rank is competition
ranking: tied totals share a position and the next distinct total skips
past every tied team, which is exactly what `RANK() OVER (ORDER BY
3 * wins + draws DESC)` computes. In the example, Manchester City's and
Liverpool's 20 points both receive position 1, and Chelsea's 18 points
receives position 3 — one past the two teams already placed.

`DENSE_RANK()` is the natural misstep: it also gives ties equal numbers but
counts them as one, so Chelsea would land in position 2 instead of 3 and
every team below would shift up. A correlated subquery — one plus a count of
rows whose total is strictly larger — reaches the same positions as the
window, at the cost of rescanning the table per row; the window computes all
positions in a single sort.

The final `ORDER BY points DESC, team_name` presents the required table:
highest total first, alphabetical by name among equals. The judge compares
rows as an unordered multiset, so that ordering is presentation rather than
correctness, but it costs nothing beyond the sort the ranking already
performs.

**Complexity:** `O(N log N)` time, `O(N)` space.
