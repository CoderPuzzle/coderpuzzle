SELECT
  s.school_id,
  COALESCE(MIN(e.score), -1) AS score
FROM
  Schools s
  LEFT JOIN Exam e ON e.student_count <= s.capacity
GROUP BY
  s.school_id