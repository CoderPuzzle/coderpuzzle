SELECT
  employee_id,
  name,
  department,
  salary
FROM
  Employees
ORDER BY
  row_position ASC
LIMIT
  3