WITH
  posts AS (
    SELECT DISTINCT
      sub_id AS post_id
    FROM
      Submissions
    WHERE
      parent_id IS NULL
  ),
  comments AS (
    SELECT DISTINCT
      parent_id AS post_id,
      sub_id AS comment_id
    FROM
      Submissions
    WHERE
      parent_id IS NOT NULL
  )
SELECT
  p.post_id,
  COUNT(c.comment_id) AS number_of_comments
FROM
  posts p
  LEFT JOIN comments c ON c.post_id = p.post_id
GROUP BY
  p.post_id
ORDER BY
  p.post_id ASC