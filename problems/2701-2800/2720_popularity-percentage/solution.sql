WITH
  directed AS (
    SELECT
      user1 AS u,
      user2 AS f
    FROM
      Friends
    UNION ALL
    SELECT
      user2,
      user1
    FROM
      Friends
  ),
  population AS (
    SELECT
      COUNT(DISTINCT u) AS users
    FROM
      directed
  )
SELECT
  d.u AS user1,
  ROUND(100.0 * COUNT(f) / p.users, 2) AS percentage_popularity
FROM
  directed d
  CROSS JOIN population p
GROUP BY
  d.u
ORDER BY
  user1