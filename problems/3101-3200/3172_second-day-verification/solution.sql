SELECT
  e.user_id
FROM
  emails e
WHERE
  EXISTS (
    SELECT
      1
    FROM
      texts t
    WHERE
      t.email_id = e.email_id
      AND t.signup_action = 'Verified'
      AND DATE(t.action_date) = DATE(e.signup_date, '+1 day')
  )
ORDER BY
  e.user_id