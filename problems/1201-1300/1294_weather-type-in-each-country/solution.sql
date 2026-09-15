SELECT
  c.country_name,
  CASE
    WHEN ROUND(AVG(w.weather_state)) <= 15 THEN 'Cold'
    WHEN ROUND(AVG(w.weather_state)) >= 25 THEN 'Hot'
    ELSE 'Warm'
  END AS weather_type
FROM
  Weather w
  JOIN Countries c ON c.country_id = w.country_id
WHERE
  w.day BETWEEN '2019-11-01' AND '2019-11-30'
GROUP BY
  c.country_id,
  c.country_name