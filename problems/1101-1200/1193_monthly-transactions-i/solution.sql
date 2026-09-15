SELECT
  strftime('%Y-%m', trans_date) AS month,
  country,
  COUNT(*) AS trans_count,
  SUM(state = 'approved') AS approved_count,
  SUM(amount) AS trans_total_amount,
  COALESCE(
    SUM(
      CASE
        WHEN state = 'approved' THEN amount
      END
    ),
    0
  ) AS approved_total_amount
FROM
  Transactions
GROUP BY
  month,
  country