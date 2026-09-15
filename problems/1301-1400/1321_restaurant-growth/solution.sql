SELECT
  d1.visited_on AS visited_on,
  SUM(d2.amount) AS amount,
  ROUND(SUM(d2.amount) / 7.0, 2) AS average_amount
FROM
  (
    SELECT DISTINCT
      visited_on
    FROM
      Customer
  ) d1
  JOIN (
    SELECT
      visited_on,
      SUM(amount) AS amount
    FROM
      Customer
    GROUP BY
      visited_on
  ) d2 ON d2.visited_on BETWEEN DATE(d1.visited_on, '-6 day') AND d1.visited_on
GROUP BY
  d1.visited_on
HAVING
  COUNT(*) = 7
ORDER BY
  visited_on ASC