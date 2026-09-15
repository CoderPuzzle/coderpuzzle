SELECT
  login_date,
  COUNT(*) AS user_count
FROM
  (
    SELECT
      user_id,
      MIN(activity_date) AS login_date
    FROM
      Traffic
    WHERE
      activity = 'login'
    GROUP BY
      user_id
  ) AS first_logins
WHERE
  login_date BETWEEN DATE('2019-06-30', '-90 day') AND '2019-06-30'
GROUP BY
  login_date