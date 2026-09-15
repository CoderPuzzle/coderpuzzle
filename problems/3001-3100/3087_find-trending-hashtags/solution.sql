WITH
  feb AS (
    SELECT
      SUBSTR(tweet, INSTR(tweet, '#')) AS tail
    FROM
      Tweets
    WHERE
      tweet_date BETWEEN '2024-02-01' AND '2024-02-29'
  ),
  hashtags AS (
    SELECT
      CASE
        WHEN INSTR(tail, ' ') = 0 THEN tail
        ELSE SUBSTR(tail, 1, INSTR(tail, ' ') - 1)
      END AS hashtag
    FROM
      feb
  )
SELECT
  hashtag,
  COUNT(*) AS hashtag_count
FROM
  hashtags
GROUP BY
  hashtag
ORDER BY
  hashtag_count DESC,
  hashtag DESC
LIMIT
  3