SELECT
  p.product_id,
  p.product_name,
  y.report_year,
  (
    CAST(
      julianday(
        MIN(
          s.period_end,
          CAST(y.report_year AS TEXT) || '-12-31'
        )
      ) - julianday(
        MAX(
          s.period_start,
          CAST(y.report_year AS TEXT) || '-01-01'
        )
      ) AS INTEGER
    ) + 1
  ) * s.average_daily_sales AS total_amount
FROM
  Sales s
  CROSS JOIN (
    SELECT
      2018 AS report_year
    UNION
    SELECT
      2019
    UNION
    SELECT
      2020
  ) y
  JOIN Product p ON p.product_id = s.product_id
WHERE
  s.period_end >= CAST(y.report_year AS TEXT) || '-01-01'
  AND s.period_start <= CAST(y.report_year AS TEXT) || '-12-31'
ORDER BY
  p.product_id,
  report_year