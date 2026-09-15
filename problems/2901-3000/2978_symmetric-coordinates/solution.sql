SELECT DISTINCT
  a.X AS x,
  a.Y AS y
FROM
  Coordinates a
  JOIN Coordinates b ON a.X = b.Y
  AND a.Y = b.X
WHERE
  a.X <= a.Y
ORDER BY
  x ASC,
  y ASC