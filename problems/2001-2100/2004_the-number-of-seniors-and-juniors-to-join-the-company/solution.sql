WITH
  ranked AS (
    SELECT
      employee_id,
      experience,
      salary,
      SUM(salary) OVER (
        PARTITION BY
          experience
        ORDER BY
          salary,
          employee_id ROWS BETWEEN UNBOUNDED PRECEDING
          AND CURRENT ROW
      ) AS running_salary
    FROM
      Candidates
  ),
  senior_hires AS (
    SELECT
      COUNT(*) AS accepted_candidates,
      COALESCE(SUM(salary), 0) AS spent
    FROM
      ranked
    WHERE
      experience = 'Senior'
      AND running_salary <= 70000
  ),
  junior_hires AS (
    SELECT
      COUNT(*) AS accepted_candidates
    FROM
      ranked
      CROSS JOIN senior_hires
    WHERE
      experience = 'Junior'
      AND running_salary <= 70000 - senior_hires.spent
  )
SELECT
  'Senior' AS experience,
  accepted_candidates
FROM
  senior_hires
UNION ALL
SELECT
  'Junior' AS experience,
  accepted_candidates
FROM
  junior_hires