WITH
  friends AS (
    SELECT
      user1_id AS a,
      user2_id AS b
    FROM
      Friendship
    UNION ALL
    SELECT
      user2_id AS a,
      user1_id AS b
    FROM
      Friendship
  )
SELECT
  f.user1_id,
  f.user2_id,
  COUNT(DISTINCT x.b) AS common_friend
FROM
  Friendship f
  JOIN friends x ON x.a = f.user1_id
  JOIN friends y ON y.a = f.user2_id
  AND y.b = x.b
GROUP BY
  f.user1_id,
  f.user2_id
HAVING
  COUNT(DISTINCT x.b) >= 3