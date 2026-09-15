# Solutions — Premier League Table Ranking III

## Derived per-team totals, then a windowed rank inside each season

Every output column except `position` is an arithmetic derivation of the
stored columns, so a CTE first materializes each row's season, ids and
name alongside its two computed measures: `points` as `3 * wins + draws`
and `goal_difference` as `goals_for - goals_against`. Neither
`matches_played` nor `losses` influences the answer, so they are dropped
at this stage.

The ranking itself is a single window pass: `ROW_NUMBER() OVER
(PARTITION BY season_id ORDER BY points DESC, goal_difference DESC,
team_name)` numbers teams within their own season under exactly the
total order the statement defines — points descending, goal difference
descending, then the alphabetical name tiebreak. The three-key ordering
makes the numbering total, so every season emits positions `1..n` with
no gaps or duplicates. The outer query returns the six required columns
and re-sorts by `season_id`, `position`, then `team_name`, matching the
required output order directly.

**Complexity:** `O(n log n)` time, `O(n)` space.
