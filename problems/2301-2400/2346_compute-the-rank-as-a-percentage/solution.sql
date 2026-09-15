SELECT
  student_id,
  department_id,
  ROUND(
    (
      RANK() OVER (
        PARTITION BY
          department_id
        ORDER BY
          mark DESC
      ) - 1
    ) * 100.0 / (
      COUNT(*) OVER (
        PARTITION BY
          department_id
      ) - 1
    ),
    2
  ) AS percentage
FROM
  Students