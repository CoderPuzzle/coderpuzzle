SELECT
  f.user_id,
  l.page_id,
  COUNT(*) AS friends_likes
FROM
  (
    SELECT
      user1_id AS user_id,
      user2_id AS friend_id
    FROM
      Friendship
    UNION
    SELECT
      user2_id,
      user1_id
    FROM
      Friendship
  ) f
  JOIN Likes l ON l.user_id = f.friend_id
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      Likes me
    WHERE
      me.user_id = f.user_id
      AND me.page_id = l.page_id
  )
GROUP BY
  f.user_id,
  l.page_id