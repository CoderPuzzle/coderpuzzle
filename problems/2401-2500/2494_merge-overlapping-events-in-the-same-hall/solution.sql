WITH
  ranked AS (
    SELECT
      hall_id,
      start_day,
      end_day,
      ROW_NUMBER() OVER (
        PARTITION BY
          hall_id
        ORDER BY
          start_day,
          end_day,
          rowid
      ) AS rn
    FROM
      HallEvents
  ),
  flags AS (
    SELECT
      hall_id,
      start_day,
      end_day,
      rn,
      CASE
        WHEN start_day <= COALESCE(
          MAX(end_day) OVER (
            PARTITION BY
              hall_id
            ORDER BY
              rn ROWS BETWEEN UNBOUNDED PRECEDING
              AND 1 PRECEDING
          ),
          start_day
        ) THEN 0
        ELSE 1
      END AS starts_new
    FROM
      ranked
  ),
  groups AS (
    SELECT
      hall_id,
      start_day,
      end_day,
      SUM(starts_new) OVER (
        PARTITION BY
          hall_id
        ORDER BY
          rn
      ) AS gid
    FROM
      flags
  )
SELECT
  hall_id,
  MIN(start_day) AS start_day,
  MAX(end_day) AS end_day
FROM
  groups
GROUP BY
  hall_id,
  gid
ORDER BY
  hall_id,
  start_day