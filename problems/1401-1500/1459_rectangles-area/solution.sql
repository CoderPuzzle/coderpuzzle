SELECT
  a.id AS p1,
  b.id AS p2,
  ABS(a.x_value - b.x_value) * ABS(a.y_value - b.y_value) AS area
FROM
  Points a
  JOIN Points b ON a.id < b.id
WHERE
  ABS(a.x_value - b.x_value) * ABS(a.y_value - b.y_value) > 0
ORDER BY
  area DESC,
  p1 ASC,
  p2 ASC