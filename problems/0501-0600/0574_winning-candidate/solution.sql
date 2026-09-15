SELECT
  name
FROM
  Candidate
  JOIN Vote ON Candidate.id = Vote.candidateId
GROUP BY
  Candidate.id,
  name
ORDER BY
  COUNT(*) DESC
LIMIT
  1