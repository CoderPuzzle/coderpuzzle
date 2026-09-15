WITH
  yearly AS (
    SELECT
      customer_id,
      CAST(strftime('%Y', order_date) AS INTEGER) AS yr,
      SUM(price) AS total
    FROM
      Orders
    GROUP BY
      customer_id,
      yr
  ),
  bounds AS (
    SELECT
      customer_id,
      MIN(yr) AS first_yr,
      MAX(yr) AS last_yr
    FROM
      yearly
    GROUP BY
      customer_id
  ),
  years (customer_id, yr) AS (
    SELECT
      customer_id,
      first_yr
    FROM
      bounds
    UNION ALL
    SELECT
      y.customer_id,
      y.yr + 1
    FROM
      years y
      JOIN bounds b ON y.customer_id = b.customer_id
    WHERE
      y.yr < b.last_yr
  ),
  full AS (
    SELECT
      y.customer_id,
      y.yr,
      COALESCE(t.total, 0) AS total
    FROM
      years y
      LEFT JOIN yearly t ON y.customer_id = t.customer_id
      AND y.yr = t.yr
  ),
  bad AS (
    SELECT
      f1.customer_id
    FROM
      full f1
      JOIN full f2 ON f1.customer_id = f2.customer_id
      AND f2.yr = f1.yr + 1
      AND f2.total <= f1.total
  )
SELECT
  customer_id
FROM
  yearly
EXCEPT
SELECT
  customer_id
FROM
  bad
ORDER BY
  customer_id