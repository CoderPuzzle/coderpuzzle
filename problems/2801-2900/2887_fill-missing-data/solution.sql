SELECT
  name,
  COALESCE(quantity, 0) AS quantity,
  price
FROM
  products
ORDER BY
  row_position ASC