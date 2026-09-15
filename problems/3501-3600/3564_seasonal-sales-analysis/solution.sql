WITH
  categorized AS (
    SELECT
      CASE CAST(strftime('%m', s.sale_date) AS INTEGER)
        WHEN 12 THEN 'Winter'
        WHEN 1 THEN 'Winter'
        WHEN 2 THEN 'Winter'
        WHEN 3 THEN 'Spring'
        WHEN 4 THEN 'Spring'
        WHEN 5 THEN 'Spring'
        WHEN 6 THEN 'Summer'
        WHEN 7 THEN 'Summer'
        WHEN 8 THEN 'Summer'
        ELSE 'Fall'
      END AS season,
      p.category AS category,
      SUM(s.quantity) AS total_quantity,
      SUM(
        s.quantity * CAST(ROUND(s.price * 100) AS INTEGER)
      ) AS total_cents
    FROM
      sales s
      JOIN products p ON p.product_id = s.product_id
    GROUP BY
      season,
      category
  ),
  ranked AS (
    SELECT
      *,
      RANK() OVER (
        PARTITION BY
          season
        ORDER BY
          total_quantity DESC,
          total_cents DESC,
          category ASC
      ) AS rnk
    FROM
      categorized
  )
SELECT
  season,
  category,
  total_quantity,
  total_cents / 100.0 AS total_revenue
FROM
  ranked
WHERE
  rnk = 1
ORDER BY
  season ASC