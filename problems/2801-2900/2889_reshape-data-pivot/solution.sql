SELECT
  group_concat(
    'max(CASE WHEN city = ' || quote(city) || ' THEN temperature END) AS "' || replace(city, '"', '""') || '"',
    ','
    ORDER BY
      city
  )
FROM
  (
    SELECT DISTINCT
      city
    FROM
      weather
  );

SELECT
  month,
  __COLUMNS__
FROM
  weather
GROUP BY
  month
ORDER BY
  month