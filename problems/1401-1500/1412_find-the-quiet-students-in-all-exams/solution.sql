SELECT
  s.student_id,
  s.student_name
FROM
  Student s
WHERE
  s.student_id IN (
    SELECT DISTINCT
      student_id
    FROM
      Exam
  )
  AND s.student_id NOT IN (
    SELECT
      e.student_id
    FROM
      Exam e
      JOIN (
        SELECT
          exam_id,
          MAX(score) AS max_score,
          MIN(score) AS min_score
        FROM
          Exam
        GROUP BY
          exam_id
      ) t ON e.exam_id = t.exam_id
    WHERE
      e.score = t.max_score
      OR e.score = t.min_score
  )
ORDER BY
  s.student_id