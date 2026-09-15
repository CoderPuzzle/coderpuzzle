WITH
  windows AS (
    SELECT
      user_id,
      visit_date,
      LEAD(visit_date) OVER (
        PARTITION BY
          user_id
        ORDER BY
          visit_date
      ) AS next_date
    FROM
      UserVisits
  )
SELECT
  user_id,
  MAX(
    CAST(
      julianday(COALESCE(next_date, '2021-01-01')) - julianday(visit_date) AS INTEGER
    )
  ) AS biggest_window
FROM
  windows
GROUP BY
  user_id
ORDER BY
  user_id