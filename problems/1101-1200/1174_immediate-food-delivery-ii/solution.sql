SELECT
  ROUND(
    100.0 * SUM(d.order_date = d.customer_pref_delivery_date) / COUNT(*),
    2
  ) AS immediate_percentage
FROM
  Delivery AS d
  JOIN (
    SELECT
      customer_id,
      MIN(order_date) AS first_order_date
    FROM
      Delivery
    GROUP BY
      customer_id
  ) AS firsts ON d.customer_id = firsts.customer_id
  AND d.order_date = firsts.first_order_date