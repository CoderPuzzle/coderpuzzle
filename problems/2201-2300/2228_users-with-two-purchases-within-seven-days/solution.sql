SELECT DISTINCT
  p1.user_id AS user_id
FROM
  Purchases p1
  JOIN Purchases p2 ON p1.user_id = p2.user_id
  AND p1.purchase_id < p2.purchase_id
  AND ABS(
    CAST(
      julianday(p1.purchase_date) - julianday(p2.purchase_date) AS INTEGER
    )
  ) <= 7
ORDER BY
  user_id