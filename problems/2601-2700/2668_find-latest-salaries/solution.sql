SELECT
  emp_id,
  firstname,
  lastname,
  salary,
  department_id
FROM
  (
    SELECT
      *,
      ROW_NUMBER() OVER (
        PARTITION BY
          emp_id
        ORDER BY
          CAST(salary AS INTEGER) DESC
      ) AS rn
    FROM
      Salary
  )
WHERE
  rn = 1
ORDER BY
  emp_id