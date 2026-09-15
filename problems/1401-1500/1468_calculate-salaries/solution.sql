SELECT
  s.company_id AS company_id,
  s.employee_id AS employee_id,
  s.employee_name AS employee_name,
  CAST(
    ROUND(
      s.salary * (
        1 - CASE
          WHEN m.max_salary < 1000 THEN 0.0
          WHEN m.max_salary <= 10000 THEN 0.24
          ELSE 0.49
        END
      )
    ) AS INTEGER
  ) AS salary
FROM
  Salaries s
  JOIN (
    SELECT
      company_id,
      MAX(salary) AS max_salary
    FROM
      Salaries
    GROUP BY
      company_id
  ) m ON s.company_id = m.company_id