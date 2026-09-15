SELECT
  t.customer_id,
  t.product_id,
  p.product_name
FROM
  (
    SELECT
      customer_id,
      product_id,
      COUNT(*) AS order_count
    FROM
      Orders
    GROUP BY
      customer_id,
      product_id
  ) t
  JOIN Products p ON p.product_id = t.product_id
WHERE
  t.order_count = (
    SELECT
      MAX(t2.order_count)
    FROM
      (
        SELECT
          product_id,
          COUNT(*) AS order_count
        FROM
          Orders
        WHERE
          customer_id = t.customer_id
        GROUP BY
          product_id
      ) t2
  )