SELECT
  ROUND(AVG(daily_percent), 2) AS average_daily_percent
FROM
  (
    SELECT
      a.action_date,
      100.0 * COUNT(
        DISTINCT CASE
          WHEN r.post_id IS NOT NULL THEN a.post_id
        END
      ) / COUNT(DISTINCT a.post_id) AS daily_percent
    FROM
      Actions a
      LEFT JOIN Removals r ON r.post_id = a.post_id
    WHERE
      a.action = 'report'
      AND a.extra = 'spam'
    GROUP BY
      a.action_date
  ) AS per_day