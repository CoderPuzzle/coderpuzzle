WITH
  awards AS (
    SELECT
      host_team AS team_id,
      CASE
        WHEN host_goals > guest_goals THEN 3
        WHEN host_goals = guest_goals THEN 1
        ELSE 0
      END AS pts
    FROM
      Matches
    UNION ALL
    SELECT
      guest_team AS team_id,
      CASE
        WHEN guest_goals > host_goals THEN 3
        WHEN guest_goals = host_goals THEN 1
        ELSE 0
      END AS pts
    FROM
      Matches
  )
SELECT
  t.team_id,
  t.team_name,
  COALESCE(SUM(a.pts), 0) AS num_points
FROM
  Teams t
  LEFT JOIN awards a ON a.team_id = t.team_id
GROUP BY
  t.team_id,
  t.team_name
ORDER BY
  num_points DESC,
  t.team_id ASC