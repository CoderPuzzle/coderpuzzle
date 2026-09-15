WITH
  unfolded AS (
    SELECT
      caller_id AS user_id,
      recipient_id AS other_id,
      call_time
    FROM
      Calls
    UNION ALL
    SELECT
      recipient_id AS user_id,
      caller_id AS other_id,
      call_time
    FROM
      Calls
  ),
  first_last AS (
    SELECT
      user_id,
      DATE(call_time) AS day,
      MIN(call_time) AS first_time,
      MAX(call_time) AS last_time
    FROM
      unfolded
    GROUP BY
      user_id,
      DATE(call_time)
  )
SELECT DISTINCT
  first_last.user_id
FROM
  first_last
  JOIN unfolded AS first_call ON first_call.user_id = first_last.user_id
  AND first_call.call_time = first_last.first_time
  JOIN unfolded AS last_call ON last_call.user_id = first_last.user_id
  AND last_call.call_time = first_last.last_time
WHERE
  first_call.other_id = last_call.other_id