WITH
  spent AS (
    SELECT
      s.user_id,
      s.product_id,
      SUM(s.quantity * p.price) AS spend
    FROM
      Sales s,
      Product p
    WHERE
      s.product_id = p.product_id
    GROUP BY
      s.user_id,
      s.product_id
  ),
  best AS (
    SELECT
      user_id,
      MAX(spend) AS top
    FROM
      spent
    GROUP BY
      user_id
  )
SELECT
  spent.user_id,
  spent.product_id
FROM
  spent,
  best
WHERE
  spent.user_id = best.user_id
  AND spent.spend = best.top