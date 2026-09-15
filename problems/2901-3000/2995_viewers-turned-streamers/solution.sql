WITH
  firsts AS (
    SELECT
      user_id,
      session_type,
      ROW_NUMBER() OVER (
        PARTITION BY
          user_id
        ORDER BY
          session_start,
          session_id
      ) AS rn
    FROM
      Sessions
  ),
  totals AS (
    SELECT
      user_id,
      COUNT(*) AS sessions_count
    FROM
      Sessions
    WHERE
      session_type = 'Streamer'
    GROUP BY
      user_id
  )
SELECT
  f.user_id,
  t.sessions_count
FROM
  firsts f
  JOIN totals t ON t.user_id = f.user_id
WHERE
  f.rn = 1
  AND f.session_type = 'Viewer'
ORDER BY
  t.sessions_count DESC,
  f.user_id DESC