WITH
  single_days AS (
    SELECT
      user_id,
      action_date,
      action
    FROM
      activity
    GROUP BY
      user_id,
      action_date
    HAVING
      COUNT(*) = 1
  ),
  ranked AS (
    SELECT
      user_id,
      action,
      action_date,
      ROW_NUMBER() OVER (
        PARTITION BY
          user_id,
          action
        ORDER BY
          action_date
      ) AS rn
    FROM
      single_days
  ),
  streaks AS (
    SELECT
      user_id,
      action,
      COUNT(*) AS streak_length,
      MIN(action_date) AS start_date,
      MAX(action_date) AS end_date
    FROM
      ranked
    GROUP BY
      user_id,
      action,
      DATE(action_date, '-' || rn || ' days')
    HAVING
      COUNT(*) >= 5
  ),
  best AS (
    SELECT
      user_id,
      action,
      streak_length,
      start_date,
      end_date,
      ROW_NUMBER() OVER (
        PARTITION BY
          user_id
        ORDER BY
          streak_length DESC,
          start_date ASC,
          action ASC
      ) AS rn
    FROM
      streaks
  )
SELECT
  user_id,
  action,
  streak_length,
  start_date,
  end_date
FROM
  best
WHERE
  rn = 1
ORDER BY
  streak_length DESC,
  user_id ASC