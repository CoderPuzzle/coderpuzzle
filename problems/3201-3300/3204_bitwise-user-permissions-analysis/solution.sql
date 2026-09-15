WITH RECURSIVE
  bits (b) AS (
    SELECT
      0
    UNION ALL
    SELECT
      b + 1
    FROM
      bits
    WHERE
      b < 30
  ),
  per_bit AS (
    SELECT
      b,
      MIN((permissions >> b) & 1) AS and_bit,
      MAX((permissions >> b) & 1) AS or_bit
    FROM
      user_permissions
      CROSS JOIN bits
    GROUP BY
      b
  )
SELECT
  SUM(and_bit << b) AS common_perms,
  SUM(or_bit << b) AS any_perms
FROM
  per_bit