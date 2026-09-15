SELECT
  s.student_id
FROM
  students AS s
WHERE
  (
    SELECT
      COUNT(*)
    FROM
      courses AS m
    WHERE
      m.major = s.major
      AND LOWER(m.mandatory) = 'yes'
  ) = (
    SELECT
      COUNT(DISTINCT e.course_id)
    FROM
      enrollments AS e
      JOIN courses AS c ON c.course_id = e.course_id
    WHERE
      e.student_id = s.student_id
      AND c.major = s.major
      AND LOWER(c.mandatory) = 'yes'
      AND e.grade = 'A'
  )
  AND (
    SELECT
      COUNT(DISTINCT e.course_id)
    FROM
      enrollments AS e
      JOIN courses AS c ON c.course_id = e.course_id
    WHERE
      e.student_id = s.student_id
      AND c.major = s.major
      AND LOWER(c.mandatory) = 'no'
  ) >= 2
  AND NOT EXISTS (
    SELECT
      1
    FROM
      enrollments AS e
      JOIN courses AS c ON c.course_id = e.course_id
    WHERE
      e.student_id = s.student_id
      AND c.major = s.major
      AND (
        (
          LOWER(c.mandatory) = 'yes'
          AND e.grade <> 'A'
        )
        OR (
          LOWER(c.mandatory) = 'no'
          AND e.grade NOT IN ('A', 'B')
        )
      )
  )
  AND (
    SELECT
      AVG(e.GPA)
    FROM
      enrollments AS e
    WHERE
      e.student_id = s.student_id
  ) >= 2.5
ORDER BY
  s.student_id