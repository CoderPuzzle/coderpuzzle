WITH
  yearly AS (
    SELECT
      product_id,
      CAST(strftime('%Y', purchase_date) AS INTEGER) AS yr,
      COUNT(*) AS orders
    FROM
      Orders
    GROUP BY
      product_id,
      yr
  )
SELECT DISTINCT
  a.product_id
FROM
  yearly a,
  yearly b
WHERE
  a.product_id = b.product_id
  AND b.yr = a.yr + 1
  AND a.orders >= 3
  AND b.orders >= 3