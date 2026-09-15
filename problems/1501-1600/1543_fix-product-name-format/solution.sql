SELECT
  LOWER(TRIM(product_name)) AS product_name,
  strftime('%Y-%m', sale_date) AS sale_date,
  COUNT(*) AS total
FROM
  Sales
GROUP BY
  LOWER(TRIM(product_name)),
  strftime('%Y-%m', sale_date)
ORDER BY
  product_name ASC,
  sale_date ASC