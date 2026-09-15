SELECT DISTINCT
  m1.account_id
FROM
  (
    SELECT
      account_id,
      SUBSTR(day, 1, 7) AS month,
      SUM(amount) AS income
    FROM
      Transactions
    WHERE
      type = 'Creditor'
    GROUP BY
      account_id,
      SUBSTR(day, 1, 7)
  ) AS m1
  JOIN Accounts a ON a.account_id = m1.account_id
  JOIN (
    SELECT
      account_id,
      SUBSTR(day, 1, 7) AS month,
      SUM(amount) AS income
    FROM
      Transactions
    WHERE
      type = 'Creditor'
    GROUP BY
      account_id,
      SUBSTR(day, 1, 7)
  ) AS m2 ON m2.account_id = m1.account_id
  AND m2.month = CAST(
    CAST(SUBSTR(m1.month, 1, 4) AS INTEGER) + (CAST(SUBSTR(m1.month, 6, 2) AS INTEGER) = 12) AS TEXT
  ) || '-' || SUBSTR(
    '0' || (
      (CAST(SUBSTR(m1.month, 6, 2) AS INTEGER) % 12) + 1
    ),
    -2
  )
WHERE
  m1.income > a.max_income
  AND m2.income > a.max_income