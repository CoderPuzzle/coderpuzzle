SELECT
  p.employee_id,
  p.project_id,
  e.name AS employee_name,
  p.workload AS project_workload
FROM
  Project p,
  Employees e
WHERE
  p.employee_id = e.employee_id
  AND p.workload > (
    SELECT
      AVG(p2.workload)
    FROM
      Project p2,
      Employees e2
    WHERE
      p2.employee_id = e2.employee_id
      AND e2.team = e.team
  )
ORDER BY
  p.employee_id ASC,
  p.project_id ASC