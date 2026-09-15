WITH RECURSIVE
  seq (id) AS (
    SELECT
      1
    UNION ALL
    SELECT
      id + 1
    FROM
      seq
    WHERE
      id < (
        SELECT
          MAX(customer_id)
        FROM
          Customers
      )
  )
SELECT
  id AS ids
FROM
  seq
WHERE
  id NOT IN (
    SELECT
      customer_id
    FROM
      Customers
  )
ORDER BY
  ids