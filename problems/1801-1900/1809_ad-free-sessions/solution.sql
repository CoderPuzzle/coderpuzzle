SELECT
  session_id
FROM
  Playback p
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      Ads a
    WHERE
      a.customer_id = p.customer_id
      AND a.timestamp BETWEEN p.start_time AND p.end_time
  )