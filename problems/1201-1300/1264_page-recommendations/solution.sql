WITH
  friends AS (
    SELECT
      user2_id AS friend
    FROM
      Friendship
    WHERE
      user1_id = 1
    UNION
    SELECT
      user1_id AS friend
    FROM
      Friendship
    WHERE
      user2_id = 1
  )
SELECT DISTINCT
  l.page_id AS recommended_page
FROM
  friends f
  JOIN Likes l ON l.user_id = f.friend
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      Likes mine
    WHERE
      mine.user_id = 1
      AND mine.page_id = l.page_id
  )