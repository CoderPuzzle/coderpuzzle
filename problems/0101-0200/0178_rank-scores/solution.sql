SELECT
  score,
  DENSE_RANK() OVER (
    ORDER BY
      score DESC
  )
FROM
  Scores
ORDER BY
  score DESC