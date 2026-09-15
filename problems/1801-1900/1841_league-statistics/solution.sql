SELECT
  team_name,
  COUNT(m.points) AS matches_played,
  COALESCE(SUM(m.points), 0) AS points,
  COALESCE(SUM(m.goal_for), 0) AS goal_for,
  COALESCE(SUM(m.goal_against), 0) AS goal_against,
  COALESCE(SUM(m.goal_for), 0) - COALESCE(SUM(m.goal_against), 0) AS goal_diff
FROM
  Teams t
  LEFT JOIN (
    SELECT
      home_team_id AS team_id,
      CASE
        WHEN home_team_goals > away_team_goals THEN 3
        WHEN home_team_goals = away_team_goals THEN 1
        ELSE 0
      END AS points,
      home_team_goals AS goal_for,
      away_team_goals AS goal_against
    FROM
      Matches
    UNION ALL
    SELECT
      away_team_id AS team_id,
      CASE
        WHEN away_team_goals > home_team_goals THEN 3
        WHEN away_team_goals = home_team_goals THEN 1
        ELSE 0
      END AS points,
      away_team_goals AS goal_for,
      home_team_goals AS goal_against
    FROM
      Matches
  ) AS m ON m.team_id = t.team_id
GROUP BY
  team_name
ORDER BY
  points DESC,
  goal_diff DESC,
  team_name ASC