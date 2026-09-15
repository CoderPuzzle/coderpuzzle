SELECT
  t.customer_id,
  ROUND(SUM(t.amount), 2) AS total_amount,
  COUNT(*) AS transaction_count,
  COUNT(DISTINCT p.category) AS unique_categories,
  ROUND(AVG(t.amount), 2) AS avg_transaction_amount,
  (
    SELECT
      p2.category
    FROM
      Transactions t2
      JOIN Products p2 ON t2.product_id = p2.product_id
    WHERE
      t2.customer_id = t.customer_id
    GROUP BY
      p2.category
    ORDER BY
      COUNT(*) DESC,
      MAX(t2.transaction_date) DESC
    LIMIT
      1
  ) AS top_category,
  ROUND(COUNT(*) * 10 + SUM(t.amount) / 100.0, 2) AS loyalty_score
FROM
  Transactions t
  JOIN Products p ON t.product_id = p.product_id
GROUP BY
  t.customer_id
ORDER BY
  loyalty_score DESC,
  t.customer_id ASC