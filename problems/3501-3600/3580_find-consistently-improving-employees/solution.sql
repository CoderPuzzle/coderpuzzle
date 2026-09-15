WITH
  ranked AS (
    SELECT
      employee_id,
      rating,
      ROW_NUMBER() OVER (
        PARTITION BY
          employee_id
        ORDER BY
          review_date DESC
      ) AS recency
    FROM
      performance_reviews
  ),
  last3 AS (
    SELECT
      employee_id,
      rating,
      LEAD(rating) OVER (
        PARTITION BY
          employee_id
        ORDER BY
          recency DESC
      ) AS next_rating
    FROM
      ranked
    WHERE
      recency <= 3
  )
SELECT
  e.employee_id,
  e.name,
  MAX(l.rating) - MIN(l.rating) AS improvement_score
FROM
  last3 AS l
  JOIN employees AS e ON e.employee_id = l.employee_id
GROUP BY
  e.employee_id,
  e.name
HAVING
  COUNT(*) = 3
  AND MIN(l.next_rating - l.rating) > 0
ORDER BY
  improvement_score DESC,
  e.name ASC