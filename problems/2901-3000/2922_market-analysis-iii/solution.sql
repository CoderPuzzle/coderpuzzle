SELECT
  o.seller_id,
  COUNT(DISTINCT o.item_id) AS num_items
FROM
  Orders o
  JOIN Items i ON o.item_id = i.item_id
  JOIN Users u ON o.seller_id = u.seller_id
WHERE
  i.item_brand <> u.favorite_brand
GROUP BY
  o.seller_id
HAVING
  COUNT(DISTINCT o.item_id) = (
    SELECT
      MAX(inner_counts.cnt)
    FROM
      (
        SELECT
          COUNT(DISTINCT o2.item_id) AS cnt
        FROM
          Orders o2
          JOIN Items i2 ON o2.item_id = i2.item_id
          JOIN Users u2 ON o2.seller_id = u2.seller_id
        WHERE
          i2.item_brand <> u2.favorite_brand
        GROUP BY
          o2.seller_id
      ) AS inner_counts
  )
ORDER BY
  o.seller_id