WITH
  months AS (
    SELECT
      id,
      month,
      SUM(salary) OVER (
        PARTITION BY
          id
        ORDER BY
          month RANGE BETWEEN 2 PRECEDING
          AND CURRENT ROW
      ) AS Salary,
      MAX(month) OVER (
        PARTITION BY
          id
      ) AS last_month
    FROM
      Employee
  )
SELECT
  id,
  month,
  Salary
FROM
  months
WHERE
  month < last_month
ORDER BY
  id ASC,
  month DESC