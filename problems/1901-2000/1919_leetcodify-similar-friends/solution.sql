WITH
  common AS (
    SELECT DISTINCT
      l1.user_id AS u1,
      l2.user_id AS u2,
      l1.day AS d,
      l1.song_id AS s
    FROM
      Listens l1
      JOIN Listens l2 ON l1.song_id = l2.song_id
      AND l1.day = l2.day
      AND l1.user_id < l2.user_id
  ),
  qualifying AS (
    SELECT
      u1,
      u2
    FROM
      common
    GROUP BY
      u1,
      u2,
      d
    HAVING
      COUNT(DISTINCT s) >= 3
  )
SELECT DISTINCT
  q.u1 AS user1_id,
  q.u2 AS user2_id
FROM
  qualifying q
  JOIN Friendship f ON f.user1_id = q.u1
  AND f.user2_id = q.u2