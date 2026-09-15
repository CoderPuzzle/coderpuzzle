SELECT
  v.fuel_type,
  d.driver_id,
  ROUND(AVG(t.rating), 2) AS rating,
  SUM(t.distance) AS distance
FROM
  Trips t
  JOIN Vehicles v ON t.vehicle_id = v.vehicle_id
  JOIN Drivers d ON v.driver_id = d.driver_id
GROUP BY
  v.fuel_type,
  d.driver_id
ORDER BY
  v.fuel_type ASC,
  rating DESC,
  distance DESC,
  d.accidents ASC,
  d.driver_id ASC