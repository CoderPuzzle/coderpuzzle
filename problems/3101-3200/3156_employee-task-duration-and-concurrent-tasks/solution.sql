WITH
  ordered AS (
    SELECT
      employee_id,
      start_time,
      end_time,
      MAX(end_time) OVER (
        PARTITION BY
          employee_id
        ORDER BY
          start_time,
          task_id ROWS BETWEEN UNBOUNDED PRECEDING
          AND 1 PRECEDING
      ) AS prev_end
    FROM
      Tasks
  ),
  busy AS (
    SELECT
      employee_id,
      CASE
        WHEN prev_end IS NULL
        OR prev_end <= start_time THEN CAST(strftime('%s', end_time) AS INTEGER) - CAST(strftime('%s', start_time) AS INTEGER)
        ELSE MAX(
          CAST(strftime('%s', end_time) AS INTEGER) - CAST(strftime('%s', prev_end) AS INTEGER),
          0
        )
      END AS seg_secs
    FROM
      ordered
  ),
  busy_hours AS (
    SELECT
      employee_id,
      SUM(seg_secs) / 3600 AS total_task_hours
    FROM
      busy
    GROUP BY
      employee_id
  ),
  events AS (
    SELECT
      employee_id,
      start_time AS moment,
      1 AS step
    FROM
      Tasks
    UNION ALL
    SELECT
      employee_id,
      end_time AS moment,
      -1 AS step
    FROM
      Tasks
  ),
  sweep AS (
    SELECT
      employee_id,
      SUM(step) OVER (
        PARTITION BY
          employee_id
        ORDER BY
          moment ROWS BETWEEN UNBOUNDED PRECEDING
          AND CURRENT ROW
      ) AS level
    FROM
      events
  ),
  peak AS (
    SELECT
      employee_id,
      MAX(level) AS max_concurrent_tasks
    FROM
      sweep
    GROUP BY
      employee_id
  )
SELECT
  h.employee_id,
  h.total_task_hours,
  p.max_concurrent_tasks
FROM
  busy_hours h
  JOIN peak p ON p.employee_id = h.employee_id
ORDER BY
  h.employee_id