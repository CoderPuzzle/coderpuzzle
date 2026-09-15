WITH
  totals AS (
    SELECT
      assignment1 + assignment2 + assignment3 AS total_score
    FROM
      Scores
  )
SELECT
  MAX(total_score) - MIN(total_score) AS difference_in_score
FROM
  totals