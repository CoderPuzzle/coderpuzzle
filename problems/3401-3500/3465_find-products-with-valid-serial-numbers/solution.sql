SELECT
  product_id,
  product_name,
  description
FROM
  products
WHERE
  description GLOB '*SN[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9][^0-9]*'
  OR description GLOB '*SN[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'
ORDER BY
  product_id ASC