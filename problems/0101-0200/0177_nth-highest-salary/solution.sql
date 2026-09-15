SELECT
  MAX(salary) AS getNthHighestSalary
FROM
  (
    SELECT
      salary,
      DENSE_RANK() OVER (
        ORDER BY
          salary DESC
      ) AS rnk
    FROM
      Employee
  )
WHERE
  rnk = (
    SELECT
      n
    FROM
      Params
  )