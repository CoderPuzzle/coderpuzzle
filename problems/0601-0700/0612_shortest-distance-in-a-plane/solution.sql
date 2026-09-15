SELECT
  ROUND(
    MIN(
      SQRT(
        (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y)
      )
    ),
    2
  ) AS shortest
FROM
  Point2D a
  JOIN Point2D b ON a.x < b.x
  OR (
    a.x = b.x
    AND a.y < b.y
  )