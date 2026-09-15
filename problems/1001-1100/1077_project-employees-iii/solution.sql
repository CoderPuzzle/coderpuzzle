SELECT
  p.project_id,
  p.employee_id
FROM
  Project p
  JOIN Employee e ON p.employee_id = e.employee_id
WHERE
  (p.project_id, e.experience_years) IN (
    SELECT
      p2.project_id,
      MAX(e2.experience_years)
    FROM
      Project p2
      JOIN Employee e2 ON p2.employee_id = e2.employee_id
    GROUP BY
      p2.project_id
  )