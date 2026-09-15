WITH
  marked AS (
    SELECT
      customer_id,
      transaction_date,
      amount,
      LAG(transaction_date) OVER (
        PARTITION BY
          customer_id
        ORDER BY
          transaction_date
      ) AS prev_date,
      LAG(amount) OVER (
        PARTITION BY
          customer_id
        ORDER BY
          transaction_date
      ) AS prev_amount
    FROM
      Transactions
  ),
  islands AS (
    SELECT
      customer_id,
      transaction_date,
      SUM(
        CASE
          WHEN transaction_date = date(prev_date, '+1 day')
          AND amount > prev_amount THEN 0
          ELSE 1
        END
      ) OVER (
        PARTITION BY
          customer_id
        ORDER BY
          transaction_date
      ) AS period_id
    FROM
      marked
  )
SELECT
  customer_id,
  MIN(transaction_date) AS consecutive_start,
  MAX(transaction_date) AS consecutive_end
FROM
  islands
GROUP BY
  customer_id,
  period_id
HAVING
  COUNT(*) >= 3
ORDER BY
  customer_id,
  consecutive_start,
  consecutive_end