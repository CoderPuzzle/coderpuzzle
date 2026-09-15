SELECT
  o.order_id,
  o.customer_id,
  o.order_type
FROM
  Orders AS o
WHERE
  o.order_type = 0
  OR NOT EXISTS (
    SELECT
      1
    FROM
      Orders AS zero_order
    WHERE
      zero_order.customer_id = o.customer_id
      AND zero_order.order_type = 0
  )