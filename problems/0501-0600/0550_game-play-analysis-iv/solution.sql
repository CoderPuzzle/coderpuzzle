WITH
  first_logins AS (
    SELECT
      player_id,
      MIN(event_date) AS first_login
    FROM
      Activity
    GROUP BY
      player_id
  )
SELECT
  ROUND(
    COUNT(a.player_id) * 1.0 / COUNT(DISTINCT first_logins.player_id),
    2
  ) AS fraction
FROM
  first_logins
  LEFT JOIN Activity a ON a.player_id = first_logins.player_id
  AND a.event_date = DATE(first_logins.first_login, '+1 day')