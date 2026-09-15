SELECT
  c.name AS customer_name,
  c.customer_id,
  o.order_id,
  o.order_date
FROM
  (
    SELECT
      *,
      ROW_NUMBER() OVER (
        PARTITION BY
          customer_id
        ORDER BY
          order_date DESC,
          order_id DESC
      ) AS rn
    FROM
      Orders
  ) o
  JOIN Customers c ON c.customer_id = o.customer_id
WHERE
  o.rn <= 3
ORDER BY
  customer_name ASC,
  c.customer_id ASC,
  order_date DESC