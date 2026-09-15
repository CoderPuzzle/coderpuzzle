SELECT
  transaction_id
FROM
  (
    SELECT
      transaction_id,
      RANK() OVER (
        PARTITION BY
          SUBSTR(day, 1, 10)
        ORDER BY
          amount DESC
      ) AS rnk
    FROM
      Transactions
  )
WHERE
  rnk = 1
ORDER BY
  transaction_id ASC