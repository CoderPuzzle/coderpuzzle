SELECT
  customer_id,
  COUNT(*) AS total_orders,
  ROUND(100.0 * SUM(is_peak) / COUNT(*), 2) AS peak_hour_percentage,
  ROUND(SUM(order_rating) * 1.0 / COUNT(order_rating), 2) AS average_rating
FROM
  (
    SELECT
      customer_id,
      order_rating,
      CASE
        WHEN strftime('%H:%M:%S', order_timestamp) >= '11:00:00'
        AND strftime('%H:%M:%S', order_timestamp) < '14:00:00' THEN 1
        WHEN strftime('%H:%M:%S', order_timestamp) >= '18:00:00'
        AND strftime('%H:%M:%S', order_timestamp) < '21:00:00' THEN 1
        ELSE 0
      END AS is_peak
    FROM
      restaurant_orders
  )
GROUP BY
  customer_id
HAVING
  COUNT(*) >= 3
  AND 5 * SUM(is_peak) >= 3 * COUNT(*)
  AND 2 * COUNT(order_rating) >= COUNT(*)
  AND SUM(order_rating) >= 4 * COUNT(order_rating)
ORDER BY
  average_rating DESC,
  customer_id DESC