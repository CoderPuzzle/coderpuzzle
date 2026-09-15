WITH
  with_gap AS (
    SELECT
      ss.student_id,
      ss.session_date,
      ss.subject,
      ss.hours_studied,
      ss.session_id,
      COALESCE(
        CAST(
          julianday(ss.session_date) - julianday(
            LAG(ss.session_date) OVER (
              PARTITION BY
                ss.student_id
              ORDER BY
                ss.session_date,
                ss.session_id
            )
          ) AS INTEGER
        ),
        0
      ) AS day_gap
    FROM
      study_sessions ss
  ),
  blocks AS (
    SELECT
      *,
      SUM(
        CASE
          WHEN day_gap > 2 THEN 1
          ELSE 0
        END
      ) OVER (
        PARTITION BY
          student_id
        ORDER BY
          session_date,
          session_id ROWS BETWEEN UNBOUNDED PRECEDING
          AND CURRENT ROW
      ) AS block_id
    FROM
      with_gap
  ),
  block_stats AS (
    SELECT
      student_id,
      block_id,
      COUNT(*) AS session_count,
      COUNT(DISTINCT subject) AS cycle_length,
      SUM(hours_studied) AS total_hours
    FROM
      blocks
    GROUP BY
      student_id,
      block_id
    HAVING
      COUNT(*) >= 2 * COUNT(DISTINCT subject)
      AND COUNT(DISTINCT subject) >= 3
  ),
  best_block AS (
    SELECT
      student_id,
      cycle_length,
      total_hours
    FROM
      (
        SELECT
          student_id,
          cycle_length,
          total_hours,
          ROW_NUMBER() OVER (
            PARTITION BY
              student_id
            ORDER BY
              cycle_length DESC,
              total_hours DESC,
              block_id
          ) AS rn
        FROM
          block_stats
      )
    WHERE
      rn = 1
  )
SELECT
  s.student_id,
  s.student_name,
  s.major,
  b.cycle_length,
  CAST(b.total_hours AS REAL) AS total_study_hours
FROM
  best_block b
  JOIN students s ON s.student_id = b.student_id
ORDER BY
  b.cycle_length DESC,
  b.total_hours DESC,
  s.student_id ASC