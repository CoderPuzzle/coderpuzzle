WITH
  ev AS (
    SELECT
      server_id,
      status_time,
      session_status,
      LEAD(status_time) OVER (
        PARTITION BY
          server_id
        ORDER BY
          status_time
      ) AS next_time,
      LEAD(session_status) OVER (
        PARTITION BY
          server_id
        ORDER BY
          status_time
      ) AS next_status
    FROM
      Servers
  ),
  spans AS (
    SELECT
      STRFTIME('%s', next_time) - STRFTIME('%s', status_time) AS secs
    FROM
      ev
    WHERE
      session_status = 'start'
      AND next_status = 'stop'
  )
SELECT
  SUM(secs) / 86400 AS total_uptime_days
FROM
  spans