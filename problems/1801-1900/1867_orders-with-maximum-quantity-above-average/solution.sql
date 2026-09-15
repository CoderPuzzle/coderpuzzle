SELECT
  s.order_id
FROM
  (
    SELECT
      order_id,
      MAX(quantity) AS max_quantity
    FROM
      OrdersDetails
    GROUP BY
      order_id
  ) AS s
  CROSS JOIN (
    SELECT
      order_id AS j_order_id,
      SUM(quantity) AS total_quantity,
      COUNT(*) AS product_count
    FROM
      OrdersDetails
    GROUP BY
      order_id
  ) AS a
GROUP BY
  s.order_id,
  s.max_quantity
HAVING
  MIN(
    s.max_quantity * a.product_count - a.total_quantity
  ) > 0
ORDER BY
  s.order_id ASC