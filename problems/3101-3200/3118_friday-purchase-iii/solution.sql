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
  ),
  fridays (w, d) AS (
    SELECT
      (CAST(STRFTIME('%d', d) AS INTEGER) - 1) / 7 + 1,
      d
    FROM
      days
    WHERE
      STRFTIME('%w', d) = '5'
  ),
  memberships (m) AS (
    SELECT
      'Premium'
    UNION
    SELECT
      'VIP'
  ),
  friday_spend (d, m, s) AS (
    SELECT
      p.purchase_date,
      u.membership,
      SUM(p.amount_spend)
    FROM
      Purchases p
      JOIN Users u ON u.user_id = p.user_id
    WHERE
      u.membership IN ('Premium', 'VIP')
    GROUP BY
      p.purchase_date,
      u.membership
  )
SELECT
  f.w AS week_of_month,
  m.m AS membership,
  COALESCE(fs.s, 0) AS total_amount
FROM
  fridays f
  CROSS JOIN memberships m
  LEFT JOIN friday_spend fs ON fs.d = f.d
  AND fs.m = m.m
ORDER BY
  week_of_month,
  membership