SELECT
  order_date,
  ROUND(
    100.0 * SUM(order_date = customer_pref_delivery_date) / COUNT(*),
    2
  ) AS immediate_percentage
FROM
  Delivery
GROUP BY
  order_date
ORDER BY
  order_date