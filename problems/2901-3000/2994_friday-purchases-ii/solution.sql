WITH RECURSIVE
  days (d) AS (
    SELECT
      DATE('2023-11-01')
    UNION ALL
    SELECT
      DATE(d, '+1 day')
    FROM
      days
    WHERE
      d < DATE('2023-11-30')
  )
SELECT
  (CAST(strftime('%d', d) AS INTEGER) + 6) / 7 AS week_of_month,
  d AS purchase_date,
  COALESCE(SUM(p.amount_spend), 0) AS total_amount
FROM
  days
  LEFT JOIN Purchases p ON p.purchase_date = d
WHERE
  strftime('%w', d) = '5'
GROUP BY
  d
ORDER BY
  week_of_month