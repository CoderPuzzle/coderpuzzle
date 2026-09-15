SELECT
  s.user_id,
  s.plan_name AS current_plan,
  s.monthly_amount AS current_monthly_amount,
  h.max_historical_amount,
  CAST(
    julianday(h.last_date) - julianday(h.first_date) AS INTEGER
  ) AS days_as_subscriber
FROM
  subscription_events s
  JOIN (
    SELECT
      user_id,
      MAX(monthly_amount) AS max_historical_amount,
      MIN(event_date) AS first_date,
      MAX(event_date) AS last_date,
      SUM(event_type = 'downgrade') AS downgrade_count
    FROM
      subscription_events
    GROUP BY
      user_id
  ) h ON h.user_id = s.user_id
  AND h.last_date = s.event_date
WHERE
  s.event_type <> 'cancel'
  AND h.downgrade_count >= 1
  AND 2 * s.monthly_amount < h.max_historical_amount
  AND julianday(h.last_date) - julianday(h.first_date) >= 60
ORDER BY
  days_as_subscriber DESC,
  s.user_id ASC