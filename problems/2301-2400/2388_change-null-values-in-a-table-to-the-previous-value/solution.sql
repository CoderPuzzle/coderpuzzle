SELECT
  c1.id AS id,
  COALESCE(
    c1.drink,
    (
      SELECT
        c2.drink
      FROM
        CoffeeShop c2
      WHERE
        c2.id < c1.id
        AND c2.drink IS NOT NULL
      ORDER BY
        c2.id DESC
      LIMIT
        1
    )
  ) AS drink
FROM
  CoffeeShop c1
ORDER BY
  id ASC