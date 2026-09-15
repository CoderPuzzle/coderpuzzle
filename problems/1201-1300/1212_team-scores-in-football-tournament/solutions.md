# Solutions — Team Scores in Football Tournament

## Split every match into two awarded rows, then join and sum

Each match hands points to both of its teams, and the amount each side earns
depends on the goal comparison from that side's perspective. The query first
explodes `Matches` into one row per participating team: the host row awards
3/1/0 by `host_goals` versus `guest_goals`, the guest row by the mirrored
comparison, and `UNION ALL` keeps them both.

`Teams` is then left-joined onto those award rows and grouped. The left join
is what keeps a team that played no matches in the output — with no matching
award rows, `SUM` sees only nulls, so `COALESCE(..., 0)` reports its zero
points. Grouping by both `team_id` and `team_name` keeps every selected
column functionally dependent on the group key.

Finally `ORDER BY num_points DESC, team_id ASC` reproduces the required
ranking: points first, the smaller id breaking ties.

**Complexity:** `O(m + t log t)` time for `m` matches and `t` teams (the log
from the final sort), `O(m + t)` space.
