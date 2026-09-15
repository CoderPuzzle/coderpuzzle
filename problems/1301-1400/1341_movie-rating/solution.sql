SELECT
  results
FROM
  (
    SELECT
      u.name AS results
    FROM
      MovieRating mr
      JOIN Users u ON u.user_id = mr.user_id
    GROUP BY
      mr.user_id,
      u.name
    ORDER BY
      COUNT(*) DESC,
      u.name ASC
    LIMIT
      1
  )
UNION ALL
SELECT
  results
FROM
  (
    SELECT
      m.title AS results
    FROM
      MovieRating mr
      JOIN Movies m ON m.movie_id = mr.movie_id
    WHERE
      mr.created_at LIKE '2020-02-%'
    GROUP BY
      mr.movie_id,
      m.title
    ORDER BY
      AVG(mr.rating) DESC,
      m.title ASC
    LIMIT
      1
  )