WITH
  totals AS (
    SELECT
      season_id,
      team_id,
      team_name,
      3 * wins + draws AS points,
      goals_for - goals_against AS goal_difference
    FROM
      SeasonStats
  )
SELECT
  season_id,
  team_id,
  team_name,
  points,
  goal_difference,
  ROW_NUMBER() OVER (
    PARTITION BY
      season_id
    ORDER BY
      points DESC,
      goal_difference DESC,
      team_name
  ) AS position
FROM
  totals
ORDER BY
  season_id,
  position,
  team_name