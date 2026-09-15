WITH
  prime AS (
    SELECT
      COUNT(*) AS items,
      COALESCE(SUM(square_footage), 0) AS footage,
      COALESCE(
        CAST(
          500000 / NULLIF(SUM(square_footage), 0) AS INTEGER
        ),
        0
      ) AS rounds
    FROM
      Inventory
    WHERE
      item_type = 'prime_eligible'
  ),
  not_prime AS (
    SELECT
      COUNT(*) AS items,
      COALESCE(SUM(square_footage), 0) AS footage
    FROM
      Inventory
    WHERE
      item_type = 'not_prime'
  )
SELECT
  'prime_eligible' AS item_type,
  prime.rounds * prime.items AS item_count
FROM
  prime
UNION ALL
SELECT
  'not_prime' AS item_type,
  COALESCE(
    CAST(
      (500000 - prime.rounds * prime.footage) / NULLIF(not_prime.footage, 0) AS INTEGER
    ),
    0
  ) * not_prime.items AS item_count
FROM
  prime,
  not_prime
ORDER BY
  item_count DESC