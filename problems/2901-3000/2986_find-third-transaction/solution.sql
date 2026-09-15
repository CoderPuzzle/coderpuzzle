WITH
  sequenced AS (
    SELECT
      user_id,
      spend,
      transaction_date,
      ROW_NUMBER() OVER (
        PARTITION BY
          user_id
        ORDER BY
          transaction_date
      ) AS rn,
      LAG(spend, 1) OVER (
        PARTITION BY
          user_id
        ORDER BY
          transaction_date
      ) AS prev_spend_1,
      LAG(spend, 2) OVER (
        PARTITION BY
          user_id
        ORDER BY
          transaction_date
      ) AS prev_spend_2
    FROM
      Transactions
  )
SELECT
  user_id,
  spend AS third_transaction_spend,
  transaction_date AS third_transaction_date
FROM
  sequenced
WHERE
  rn = 3
  AND spend > prev_spend_1
  AND spend > prev_spend_2
ORDER BY
  user_id