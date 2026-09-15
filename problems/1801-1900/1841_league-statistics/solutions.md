# Solutions — League Statistics

Every match touches exactly two teams with mirrored roles: what the home
side scored for, the away side conceded against, and vice versa. The
cheapest way to see that in SQL is to unpivot `Matches` into one row per
team per match — each original row becomes a home-perspective row and an
away-perspective row — after which every statistic is a plain aggregate.

## Unpivot matches, then aggregate

The inner query reads `Matches` twice via `UNION ALL`: once keeping the
home perspective (`goal_for = home_team_goals`) and once the away one,
with the points decided by a `CASE` on the scoreline — three for a win,
one each for a draw, nothing for a loss. Joining to `Teams` and grouping
by team then collapses those rows into the six requested statistics;
`goal_diff` is recomputed from the summed goals rather than stored. The
final `ORDER BY` implements the league's tiebreakers directly: points
descending, goal difference descending, name ascending.

The statement pins the output order (it is part of the contract, not a
courtesy), so the comparison is order-sensitive here. A team with no
matches never appears — it has no rows to group — which matches the
"played matches" framing of the task. The whole query is two scans of
`Matches` plus the join and sort.

**Complexity:** `O(M log M)` time, `O(M)` space for the unpivoted rows,
where `M` is the number of matches.
