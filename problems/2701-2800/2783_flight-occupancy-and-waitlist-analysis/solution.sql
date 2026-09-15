SELECT
  f.flight_id AS flight_id,
  MIN(COALESCE(p.cnt, 0), f.capacity) AS booked_cnt,
  MAX(COALESCE(p.cnt, 0) - f.capacity, 0) AS waitlist_cnt
FROM
  Flights AS f
  LEFT JOIN (
    SELECT
      flight_id,
      COUNT(*) AS cnt
    FROM
      Passengers
    GROUP BY
      flight_id
  ) AS p ON p.flight_id = f.flight_id
ORDER BY
  f.flight_id ASC