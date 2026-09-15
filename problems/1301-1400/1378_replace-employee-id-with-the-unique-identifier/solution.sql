SELECT
  euni.unique_id,
  e.name
FROM
  Employees e
  LEFT JOIN EmployeeUNI euni ON euni.id = e.id