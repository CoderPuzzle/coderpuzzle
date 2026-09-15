SELECT
  cur.user_id,
  cur.steps_date,
  ROUND(
    (
      before_two.steps_count + before_one.steps_count + cur.steps_count
    ) / 3.0,
    2
  ) AS rolling_average
FROM
  Steps cur
  JOIN Steps before_one ON before_one.user_id = cur.user_id
  AND before_one.steps_date = DATE(cur.steps_date, '-1 day')
  JOIN Steps before_two ON before_two.user_id = cur.user_id
  AND before_two.steps_date = DATE(cur.steps_date, '-2 day')
ORDER BY
  cur.user_id ASC,
  cur.steps_date ASC