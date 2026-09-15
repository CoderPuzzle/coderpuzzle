SELECT
  c.candidate_id
FROM
  Candidates AS c
  INNER JOIN Rounds AS r ON c.interview_id = r.interview_id
WHERE
  c.years_of_exp >= 2
GROUP BY
  c.candidate_id
HAVING
  SUM(r.score) > 15