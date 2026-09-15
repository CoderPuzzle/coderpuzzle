SELECT
  q.id AS id,
  q.year AS year,
  COALESCE(n.npv, 0) AS npv
FROM
  Queries q
  LEFT JOIN NPV n ON q.id = n.id
  AND q.year = n.year