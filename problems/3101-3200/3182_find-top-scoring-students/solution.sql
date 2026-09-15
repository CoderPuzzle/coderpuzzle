SELECT
  s.student_id
FROM
  students s
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      courses c
    WHERE
      c.major = s.major
      AND NOT EXISTS (
        SELECT
          1
        FROM
          enrollments en
        WHERE
          en.student_id = s.student_id
          AND en.course_id = c.course_id
      )
  )
  AND NOT EXISTS (
    SELECT
      1
    FROM
      enrollments en
      JOIN courses c ON c.course_id = en.course_id
    WHERE
      en.student_id = s.student_id
      AND c.major = s.major
      AND en.grade <> 'A'
  )
ORDER BY
  s.student_id