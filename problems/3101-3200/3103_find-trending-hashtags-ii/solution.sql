WITH RECURSIVE
  split (tweet_id, tag, rest) AS (
    SELECT
      tweet_id,
      CAST(NULL AS VARCHAR),
      tweet
    FROM
      Tweets
    UNION ALL
    SELECT
      tweet_id,
      SUBSTR(
        SUBSTR(rest, INSTR(rest, '#')),
        1,
        INSTR(SUBSTR(rest, INSTR(rest, '#')) || ' ', ' ') - 1
      ),
      CASE
        WHEN INSTR(SUBSTR(rest, INSTR(rest, '#') + 1), '#') > 0 THEN SUBSTR(rest, INSTR(rest, '#') + 1)
      END
    FROM
      split
    WHERE
      rest IS NOT NULL
      AND INSTR(rest, '#') > 0
  )
SELECT
  hashtag,
  COUNT(*) AS count
FROM
  (
    SELECT
      tag AS hashtag
    FROM
      split
    WHERE
      tag IS NOT NULL
  )
GROUP BY
  hashtag
ORDER BY
  count DESC,
  hashtag DESC
LIMIT
  3