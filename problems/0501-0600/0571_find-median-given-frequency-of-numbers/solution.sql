WITH
  running AS (
    SELECT
      num,
      SUM(frequency) OVER (
        ORDER BY
          num
      ) AS upto,
      SUM(frequency) OVER () AS total
    FROM
      Numbers
  )
SELECT
  ROUND(
    (
      MIN(
        CASE
          WHEN upto >= (total + 1) / 2 THEN num
        END
      ) + MIN(
        CASE
          WHEN upto >= (total + 2) / 2 THEN num
        END
      )
    ) / 2.0,
    1
  ) AS median
FROM
  running