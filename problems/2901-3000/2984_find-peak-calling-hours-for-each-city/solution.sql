WITH
  hourly AS (
    SELECT
      city,
      CAST(strftime('%H', call_time) AS INTEGER) AS peak_calling_hour,
      COUNT(*) AS number_of_calls
    FROM
      Calls
    GROUP BY
      city,
      CAST(strftime('%H', call_time) AS INTEGER)
  ),
  ranked AS (
    SELECT
      city,
      peak_calling_hour,
      number_of_calls,
      RANK() OVER (
        PARTITION BY
          city
        ORDER BY
          number_of_calls DESC
      ) AS rnk
    FROM
      hourly
  )
SELECT
  city,
  peak_calling_hour,
  number_of_calls
FROM
  ranked
WHERE
  rnk = 1
ORDER BY
  peak_calling_hour DESC,
  city DESC