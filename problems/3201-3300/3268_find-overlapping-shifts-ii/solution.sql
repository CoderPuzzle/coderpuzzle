WITH
  boundaries AS (
    SELECT
      employee_id,
      start_time AS ts,
      + 1 AS delta,
      DATE(start_time) AS day
    FROM
      EmployeeShifts
    UNION ALL
    SELECT
      employee_id,
      end_time AS ts,
      -1 AS delta,
      DATE(start_time) AS day
    FROM
      EmployeeShifts
  ),
  sweep AS (
    SELECT
      employee_id,
      SUM(delta) OVER (
        PARTITION BY
          employee_id,
          day
        ORDER BY
          strftime('%s', ts),
          delta
      ) AS running_shifts
    FROM
      boundaries
  ),
  pair_totals AS (
    SELECT
      e1.employee_id AS employee_id,
      SUM(
        CAST(
          (
            strftime('%s', MIN(e1.end_time, e2.end_time)) - strftime('%s', e2.start_time)
          ) / 60 AS INTEGER
        )
      ) AS total_overlap_duration
    FROM
      EmployeeShifts e1
      JOIN EmployeeShifts e2 ON e1.employee_id = e2.employee_id
      AND DATE(e1.start_time) = DATE(e2.start_time)
      AND e1.start_time < e2.start_time
      AND e1.end_time > e2.start_time
    GROUP BY
      e1.employee_id
  )
SELECT
  sweep.employee_id,
  MAX(sweep.running_shifts) AS max_overlapping_shifts,
  COALESCE(pair_totals.total_overlap_duration, 0) AS total_overlap_duration
FROM
  sweep
  LEFT JOIN pair_totals ON pair_totals.employee_id = sweep.employee_id
GROUP BY
  sweep.employee_id
ORDER BY
  sweep.employee_id