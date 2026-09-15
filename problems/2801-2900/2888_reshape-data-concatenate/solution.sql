SELECT
  student_id,
  name,
  age
FROM
  (
    SELECT
      1 AS part,
      student_id,
      name,
      age
    FROM
      df1
    UNION ALL
    SELECT
      2 AS part,
      student_id,
      name,
      age
    FROM
      df2
  )
ORDER BY
  part ASC,
  student_id ASC