WITH
  approved AS (
    SELECT
      substr(trans_date, 1, 7) AS month,
      country,
      COUNT(*) AS approved_count,
      SUM(amount) AS approved_amount
    FROM
      Transactions
    WHERE
      state = 'approved'
    GROUP BY
      month,
      country
  ),
  chargeback_rows AS (
    SELECT
      substr(cb.trans_date, 1, 7) AS month,
      t.country AS country,
      COUNT(*) AS chargeback_count,
      SUM(t.amount) AS chargeback_amount
    FROM
      Chargebacks cb
      JOIN Transactions t ON cb.trans_id = t.id
    GROUP BY
      month,
      t.country
  ),
  combined AS (
    SELECT
      COALESCE(a.month, c.month) AS month,
      COALESCE(a.country, c.country) AS country,
      COALESCE(a.approved_count, 0) AS approved_count,
      COALESCE(a.approved_amount, 0) AS approved_amount,
      COALESCE(c.chargeback_count, 0) AS chargeback_count,
      COALESCE(c.chargeback_amount, 0) AS chargeback_amount
    FROM
      approved a
      LEFT JOIN chargeback_rows c ON a.month = c.month
      AND a.country = c.country
    UNION
    SELECT
      COALESCE(a.month, c.month) AS month,
      COALESCE(a.country, c.country) AS country,
      COALESCE(a.approved_count, 0) AS approved_count,
      COALESCE(a.approved_amount, 0) AS approved_amount,
      COALESCE(c.chargeback_count, 0) AS chargeback_count,
      COALESCE(c.chargeback_amount, 0) AS chargeback_amount
    FROM
      chargeback_rows c
      LEFT JOIN approved a ON a.month = c.month
      AND a.country = c.country
  )
SELECT
  month,
  country,
  approved_count,
  approved_amount,
  chargeback_count,
  chargeback_amount
FROM
  combined
WHERE
  NOT (
    approved_count = 0
    AND approved_amount = 0
    AND chargeback_count = 0
    AND chargeback_amount = 0
  )
ORDER BY
  month,
  country