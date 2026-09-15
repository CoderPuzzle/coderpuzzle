SELECT
  student_id,
  name,
  age
FROM
  students
WHERE
  name IS NOT NULL
ORDER BY
  row_position ASC