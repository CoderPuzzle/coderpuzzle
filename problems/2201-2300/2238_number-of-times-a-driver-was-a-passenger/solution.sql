SELECT
  r.driver_id AS driver_id,
  COUNT(DISTINCT p.ride_id) AS cnt
FROM
  Rides r
  LEFT JOIN Rides p ON r.driver_id = p.passenger_id
GROUP BY
  r.driver_id