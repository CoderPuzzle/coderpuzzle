WITH
  counts AS (
    SELECT
      r1.user_id AS user1_id,
      r2.user_id AS user2_id,
      COUNT(DISTINCT r1.follower_id) AS common
    FROM
      Relations r1
      JOIN Relations r2 ON r1.user_id < r2.user_id
      AND r1.follower_id = r2.follower_id
    GROUP BY
      r1.user_id,
      r2.user_id
  )
SELECT
  user1_id,
  user2_id
FROM
  counts
WHERE
  common = (
    SELECT
      MAX(common)
    FROM
      counts
  )