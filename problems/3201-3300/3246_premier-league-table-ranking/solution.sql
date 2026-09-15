SELECT
  team_id,
  team_name,
  3 * wins + draws AS points,
  RANK() OVER (
    ORDER BY
      3 * wins + draws DESC
  ) AS position
FROM
  TeamStats
ORDER BY
  points DESC,
  team_name