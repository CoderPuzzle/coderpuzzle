SELECT
  GROUP_CONCAT(term, '') || '=0' AS equation
FROM
  (
    SELECT
      CASE
        WHEN factor > 0 THEN '+'
        ELSE '-'
      END || ABS(factor) || CASE
        WHEN power = 0 THEN ''
        WHEN power = 1 THEN 'X'
        ELSE 'X^' || power
      END AS term
    FROM
      Terms
    ORDER BY
      power DESC
  )