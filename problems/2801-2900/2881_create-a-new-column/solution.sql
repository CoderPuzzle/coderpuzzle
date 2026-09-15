SELECT
  name,
  salary,
  salary * 2 AS bonus
FROM
  employees
ORDER BY
  row_position ASC