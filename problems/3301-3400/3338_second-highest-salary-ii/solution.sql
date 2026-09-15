WITH
  ranked AS (
    SELECT
      emp_id,
      dept,
      DENSE_RANK() OVER (
        PARTITION BY
          dept
        ORDER BY
          salary DESC
      ) AS rnk
    FROM
      employees
  )
SELECT
  emp_id,
  dept
FROM
  ranked
WHERE
  rnk = 2
ORDER BY
  emp_id