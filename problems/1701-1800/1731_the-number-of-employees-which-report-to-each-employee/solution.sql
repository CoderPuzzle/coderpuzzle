SELECT
  e.employee_id,
  e.name,
  COUNT(*) AS reports_count,
  CAST(ROUND(AVG(r.age)) AS INTEGER) AS average_age
FROM
  Employees e
  JOIN Employees r ON r.reports_to = e.employee_id
GROUP BY
  e.employee_id,
  e.name
ORDER BY
  e.employee_id