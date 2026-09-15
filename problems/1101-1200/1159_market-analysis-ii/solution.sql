SELECT
  u.user_id AS seller_id,
  COALESCE(s.fav, 'no') AS "2nd_item_fav_brand"
FROM
  Users u
  LEFT JOIN (
    SELECT
      seller_id,
      CASE
        WHEN i.item_brand = u2.favorite_brand THEN 'yes'
        ELSE 'no'
      END AS fav
    FROM
      (
        SELECT
          seller_id,
          item_id,
          ROW_NUMBER() OVER (
            PARTITION BY
              seller_id
            ORDER BY
              order_date
          ) AS rn
        FROM
          Orders
      ) ranked
      JOIN Items i ON i.item_id = ranked.item_id
      JOIN Users u2 ON u2.user_id = ranked.seller_id
    WHERE
      ranked.rn = 2
  ) s ON s.seller_id = u.user_id