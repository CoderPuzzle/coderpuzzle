SELECT
  customer_id
FROM
  customer_transactions
GROUP BY
  customer_id
HAVING
  SUM(transaction_type = 'purchase') >= 3
  AND MAX(julianday(transaction_date)) - MIN(julianday(transaction_date)) >= 30
  AND 5 * SUM(transaction_type = 'refund') < COUNT(*)
ORDER BY
  customer_id ASC