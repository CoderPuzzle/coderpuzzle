WITH
  shared_2015 AS (
    SELECT
      tiv_2015
    FROM
      Insurance
    GROUP BY
      tiv_2015
    HAVING
      COUNT(*) > 1
  ),
  unique_city AS (
    SELECT
      lat,
      lon
    FROM
      Insurance
    GROUP BY
      lat,
      lon
    HAVING
      COUNT(*) = 1
  )
SELECT
  ROUND(SUM(i.tiv_2016), 2) AS tiv_2016
FROM
  Insurance i
  JOIN shared_2015 s ON i.tiv_2015 = s.tiv_2015
  JOIN unique_city u ON i.lat = u.lat
  AND i.lon = u.lon