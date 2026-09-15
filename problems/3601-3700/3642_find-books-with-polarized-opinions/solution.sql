SELECT
  b.book_id,
  b.title,
  b.author,
  b.genre,
  b.pages,
  MAX(s.session_rating) - MIN(s.session_rating) AS rating_spread,
  ROUND(
    AVG(
      CASE
        WHEN s.session_rating <= 2
        OR s.session_rating >= 4 THEN 1.0
        ELSE 0.0
      END
    ),
    2
  ) AS polarization_score
FROM
  Books b
  JOIN ReadingSessions s ON s.book_id = b.book_id
GROUP BY
  b.book_id,
  b.title,
  b.author,
  b.genre,
  b.pages
HAVING
  COUNT(*) >= 5
  AND MIN(s.session_rating) <= 2
  AND MAX(s.session_rating) >= 4
  AND AVG(
    CASE
      WHEN s.session_rating <= 2
      OR s.session_rating >= 4 THEN 1.0
      ELSE 0.0
    END
  ) >= 0.6
ORDER BY
  polarization_score DESC,
  b.title DESC