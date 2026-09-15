SELECT
  p.product_name,
  p.product_id,
  o.order_id,
  o.order_date
FROM
  Orders o
  JOIN Products p ON p.product_id = o.product_id
WHERE
  o.order_date = (
    SELECT
      MAX(o2.order_date)
    FROM
      Orders o2
    WHERE
      o2.product_id = o.product_id
  )
ORDER BY
  product_name ASC,
  p.product_id ASC,
  o.order_id ASC