WITH RECURSIVE
  sub AS (
    SELECT
      employee_id,
      employee_name,
      salary,
      salary AS ceo_salary,
      0 AS hierarchy_level
    FROM
      Employees
    WHERE
      manager_id IS NULL
    UNION ALL
    SELECT
      e.employee_id,
      e.employee_name,
      e.salary,
      s.ceo_salary,
      s.hierarchy_level + 1
    FROM
      Employees e
      JOIN sub s ON e.manager_id = s.employee_id
  )
SELECT
  employee_id AS subordinate_id,
  employee_name AS subordinate_name,
  hierarchy_level,
  salary - ceo_salary AS salary_difference
FROM
  sub
WHERE
  hierarchy_level > 0
ORDER BY
  hierarchy_level,
  subordinate_id