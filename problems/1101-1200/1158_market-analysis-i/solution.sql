SELECT
  u.user_id AS buyer_id,
  u.join_date AS join_date,
  COALESCE(o.order_count, 0) AS orders_in_2019
FROM
  Users u
  LEFT JOIN (
    SELECT
      buyer_id,
      COUNT(*) AS order_count
    FROM
      Orders
    WHERE
      strftime('%Y', order_date) = '2019'
    GROUP BY
      buyer_id
  ) o ON o.buyer_id = u.user_id