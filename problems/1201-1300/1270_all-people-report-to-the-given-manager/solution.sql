SELECT DISTINCT
  e1.employee_id
FROM
  Employees e1
  JOIN Employees e2 ON e1.manager_id = e2.employee_id
  JOIN Employees e3 ON e2.manager_id = e3.employee_id
  JOIN Employees e4 ON e3.manager_id = e4.employee_id
WHERE
  e1.employee_id != 1
  AND e1.manager_id != e1.employee_id
  AND (
    e2.employee_id = 1
    OR e3.employee_id = 1
    OR e4.employee_id = 1
  )