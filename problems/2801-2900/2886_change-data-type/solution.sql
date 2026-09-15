SELECT
  student_id,
  name,
  age,
  CAST(grade AS INTEGER) AS grade
FROM
  students
ORDER BY
  row_position ASC