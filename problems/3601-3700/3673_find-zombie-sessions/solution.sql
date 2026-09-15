SELECT
  session_id,
  user_id,
  (
    strftime('%s', MAX(event_timestamp)) - strftime('%s', MIN(event_timestamp))
  ) / 60 AS session_duration_minutes,
  SUM(event_type = 'scroll') AS scroll_count
FROM
  app_events
GROUP BY
  session_id,
  user_id
HAVING
  strftime('%s', MAX(event_timestamp)) - strftime('%s', MIN(event_timestamp)) > 1800
  AND SUM(event_type = 'scroll') >= 5
  AND 5 * SUM(event_type = 'click') < SUM(event_type = 'scroll')
  AND SUM(event_type = 'purchase') = 0
ORDER BY
  scroll_count DESC,
  session_id ASC