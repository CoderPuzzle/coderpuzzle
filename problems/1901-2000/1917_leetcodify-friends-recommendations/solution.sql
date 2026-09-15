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
  ),
  pairs AS (
    SELECT DISTINCT
      q.u1,
      q.u2
    FROM
      qualifying q
    WHERE
      NOT EXISTS (
        SELECT
          1
        FROM
          Friendship f
        WHERE
          f.user1_id = q.u1
          AND f.user2_id = q.u2
      )
  )
SELECT
  u1 AS user_id,
  u2 AS recommended_id
FROM
  pairs
UNION ALL
SELECT
  u2 AS user_id,
  u1 AS recommended_id
FROM
  pairs