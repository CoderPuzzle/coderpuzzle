WITH
  ranked AS (
    SELECT
      id,
      company,
      salary,
      ROW_NUMBER() OVER (
        PARTITION BY
          company
        ORDER BY
          salary,
          id
      ) AS rn,
      COUNT(*) OVER (
        PARTITION BY
          company
      ) AS cnt
    FROM
      Employee
  )
SELECT
  id,
  company,
  salary
FROM
  ranked
WHERE
  rn IN ((cnt + 1) / 2, (cnt + 2) / 2)