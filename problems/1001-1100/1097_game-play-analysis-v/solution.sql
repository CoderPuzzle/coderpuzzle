WITH
  installs AS (
    SELECT
      player_id,
      MIN(event_date) AS install_dt
    FROM
      Activity
    GROUP BY
      player_id
  )
SELECT
  install_dt,
  COUNT(*) AS installs,
  ROUND(
    1.0 * SUM(
      CASE
        WHEN d.event_date IS NOT NULL THEN 1
        ELSE 0
      END
    ) / COUNT(*),
    2
  ) AS Day1_retention
FROM
  installs i
  LEFT JOIN Activity d ON d.player_id = i.player_id
  AND d.event_date = date(i.install_dt, '+1 day')
GROUP BY
  install_dt