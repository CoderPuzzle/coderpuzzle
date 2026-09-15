SELECT
  w1.id AS id
FROM
  Weather w1
  JOIN Weather w2 ON w1.recordDate = DATE(w2.recordDate, '+1 day')
WHERE
  w1.temperature > w2.temperature