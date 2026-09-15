WITH
  counts AS (
    SELECT
      dep_id,
      COUNT(*) AS emp_count
    FROM
      Employees
    GROUP BY
      dep_id
  )
SELECT
  e.emp_name AS manager_name,
  c.dep_id
FROM
  counts c
  JOIN Employees e ON e.dep_id = c.dep_id
WHERE
  e.position = 'Manager'
  AND c.emp_count = (
    SELECT
      MAX(emp_count)
    FROM
      counts
  )
ORDER BY
  c.dep_id