WITH
  ranked AS (
    SELECT
      passenger_id,
      flight_id,
      ROW_NUMBER() OVER (
        PARTITION BY
          flight_id
        ORDER BY
          booking_time
      ) AS rn
    FROM
      Passengers
  )
SELECT
  r.passenger_id AS passenger_id,
  CASE
    WHEN r.rn <= f.capacity THEN 'Confirmed'
    ELSE 'Waitlist'
  END AS Status
FROM
  ranked AS r
  JOIN Flights AS f ON f.flight_id = r.flight_id
ORDER BY
  r.passenger_id ASC