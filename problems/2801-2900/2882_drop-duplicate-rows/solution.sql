SELECT
  customer_id,
  name,
  email
FROM
  customers
WHERE
  customer_id IN (
    SELECT
      MIN(customer_id)
    FROM
      customers
    GROUP BY
      email
  )
ORDER BY
  customer_id