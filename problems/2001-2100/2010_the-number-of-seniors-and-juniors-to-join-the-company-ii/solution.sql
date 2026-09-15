WITH
  ranked AS (
    SELECT
      employee_id,
      experience,
      SUM(salary) OVER (
        PARTITION BY
          experience
        ORDER BY
          salary ROWS BETWEEN UNBOUNDED PRECEDING
          AND CURRENT ROW
      ) AS running_salary
    FROM
      Candidates
  ),
  senior_budget AS (
    SELECT
      COALESCE(MAX(running_salary), 0) AS spent
    FROM
      ranked
    WHERE
      experience = 'Senior'
      AND running_salary <= 70000
  )
SELECT
  employee_id
FROM
  ranked
  CROSS JOIN senior_budget
WHERE
  (
    experience = 'Senior'
    AND running_salary <= 70000
  )
  OR (
    experience = 'Junior'
    AND running_salary <= 70000 - senior_budget.spent
  )