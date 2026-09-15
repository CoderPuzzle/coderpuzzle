WITH
  feb AS (
    SELECT
      post_id,
      user_id,
      post_date
    FROM
      Posts
    WHERE
      post_date BETWEEN '2024-02-01' AND '2024-02-28'
  ),
  totals AS (
    SELECT
      user_id,
      COUNT(*) AS total
    FROM
      feb
    GROUP BY
      user_id
  ),
  windows AS (
    SELECT
      a.user_id AS user_id,
      a.post_date AS post_date,
      COUNT(DISTINCT b.post_id) AS win
    FROM
      feb a
      JOIN feb b ON b.user_id = a.user_id
      AND b.post_date BETWEEN a.post_date AND DATE(a.post_date, '+6 days')
    GROUP BY
      a.user_id,
      a.post_date
  ),
  best AS (
    SELECT
      user_id,
      MAX(win) AS max_7day_posts
    FROM
      windows
    GROUP BY
      user_id
  )
SELECT
  t.user_id,
  b.max_7day_posts,
  t.total * 1.0 / 4 AS avg_weekly_posts
FROM
  totals t
  JOIN best b ON b.user_id = t.user_id
WHERE
  b.max_7day_posts >= t.total * 2.0 / 4
ORDER BY
  t.user_id