SELECT
  g.student_id,
  g.subject,
  f.score AS first_score,
  l.score AS latest_score
FROM
  (
    SELECT
      student_id,
      subject,
      MIN(exam_date) AS first_date,
      MAX(exam_date) AS last_date,
      COUNT(DISTINCT exam_date) AS dates
    FROM
      Scores
    GROUP BY
      student_id,
      subject
  ) g
  JOIN Scores f ON f.student_id = g.student_id
  AND f.subject = g.subject
  AND f.exam_date = g.first_date
  JOIN Scores l ON l.student_id = g.student_id
  AND l.subject = g.subject
  AND l.exam_date = g.last_date
WHERE
  g.dates >= 2
  AND l.score > f.score
ORDER BY
  g.student_id,
  g.subject