WITH
  ranked AS (
    SELECT
      team_name,
      3 * wins + draws AS points,
      RANK() OVER (
        ORDER BY
          3 * wins + draws DESC
      ) AS position,
      COUNT(*) OVER () AS team_count
    FROM
      TeamStats
  )
SELECT
  team_name,
  points,
  position,
  CASE
    WHEN position <= (33 * team_count + 99) / 100 THEN 'Tier 1'
    WHEN position <= (66 * team_count + 99) / 100 THEN 'Tier 2'
    ELSE 'Tier 3'
  END AS tier
FROM
  ranked
ORDER BY
  points DESC,
  team_name