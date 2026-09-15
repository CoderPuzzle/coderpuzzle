SELECT
  d.name AS Department,
  e.name AS Employee,
  e.salary AS Salary
FROM
  Employee e
  JOIN (
    SELECT
      departmentId,
      MAX(salary) AS ms
    FROM
      Employee
    GROUP BY
      departmentId
  ) m ON e.departmentId = m.departmentId
  AND e.salary = m.ms
  JOIN Department d ON e.departmentId = d.id