SELECT
  u.user_id,
  u.user_name,
  u.credit + COALESCE(r.total, 0) - COALESCE(p.total, 0) AS credit,
  CASE
    WHEN u.credit + COALESCE(r.total, 0) - COALESCE(p.total, 0) < 0 THEN 'Yes'
    ELSE 'No'
  END AS credit_limit_breached
FROM
  Users u
  LEFT JOIN (
    SELECT
      paid_by,
      SUM(amount) AS total
    FROM
      Transactions
    GROUP BY
      paid_by
  ) p ON p.paid_by = u.user_id
  LEFT JOIN (
    SELECT
      paid_to,
      SUM(amount) AS total
    FROM
      Transactions
    GROUP BY
      paid_to
  ) r ON r.paid_to = u.user_id