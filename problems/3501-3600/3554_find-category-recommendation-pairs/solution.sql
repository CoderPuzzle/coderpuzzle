WITH
  user_category AS (
    SELECT DISTINCT
      pp.user_id,
      pi.category
    FROM
      ProductPurchases pp
      JOIN ProductInfo pi ON pp.product_id = pi.product_id
  ),
  pairs AS (
    SELECT
      a.category AS category1,
      b.category AS category2,
      COUNT(*) AS customer_count
    FROM
      user_category a
      JOIN user_category b ON a.user_id = b.user_id
      AND a.category < b.category
    GROUP BY
      a.category,
      b.category
  )
SELECT
  category1,
  category2,
  customer_count
FROM
  pairs
WHERE
  customer_count >= 3
ORDER BY
  customer_count DESC,
  category1,
  category2