SELECT
  seller_name
FROM
  Seller
WHERE
  seller_id NOT IN (
    SELECT
      seller_id
    FROM
      Orders
    WHERE
      strftime('%Y', sale_date) = '2020'
  )
ORDER BY
  seller_name