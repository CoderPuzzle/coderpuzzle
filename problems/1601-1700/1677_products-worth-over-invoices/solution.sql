SELECT
  p.name,
  COALESCE(t.rest, 0) AS rest,
  COALESCE(t.paid, 0) AS paid,
  COALESCE(t.canceled, 0) AS canceled,
  COALESCE(t.refunded, 0) AS refunded
FROM
  Product p
  LEFT JOIN (
    SELECT
      product_id,
      SUM(rest) AS rest,
      SUM(paid) AS paid,
      SUM(canceled) AS canceled,
      SUM(refunded) AS refunded
    FROM
      Invoice
    GROUP BY
      product_id
  ) t ON t.product_id = p.product_id
ORDER BY
  p.name