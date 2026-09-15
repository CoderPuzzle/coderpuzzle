WITH
  shares AS (
    SELECT
      voter,
      1.0 / COUNT(candidate) AS share
    FROM
      Votes
    GROUP BY
      voter
  ),
  totals AS (
    SELECT
      Votes.candidate AS candidate,
      ROUND(SUM(share), 9) AS votes
    FROM
      Votes
      JOIN shares ON Votes.voter = shares.voter
    WHERE
      Votes.candidate IS NOT NULL
    GROUP BY
      Votes.candidate
  )
SELECT
  candidate
FROM
  totals
WHERE
  votes = (
    SELECT
      MAX(votes)
    FROM
      totals
  )
ORDER BY
  candidate