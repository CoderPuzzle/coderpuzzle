WITH
  yearly AS (
    SELECT
      CAST(strftime('%Y', transaction_date) AS INTEGER) AS year,
      product_id,
      SUM(spend) AS total_spend
    FROM
      user_transactions
    GROUP BY
      product_id,
      year
  ),
  lagged AS (
    SELECT
      year,
      product_id,
      total_spend AS curr_year_spend,
      LAG(total_spend) OVER (
        PARTITION BY
          product_id
        ORDER BY
          year
      ) AS prev_year_spend
    FROM
      yearly
  )
SELECT
  year,
  product_id,
  curr_year_spend,
  prev_year_spend,
  ROUND(
    (curr_year_spend - prev_year_spend) * 100.0 / prev_year_spend,
    2
  ) AS yoy_rate
FROM
  lagged
ORDER BY
  product_id,
  year