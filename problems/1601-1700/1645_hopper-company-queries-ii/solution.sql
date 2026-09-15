WITH RECURSIVE
  months (month) AS (
    SELECT
      1
    UNION ALL
    SELECT
      month + 1
    FROM
      months
    WHERE
      month < 12
  ),
  available AS (
    SELECT
      months.month AS month,
      (
        SELECT
          COUNT(*)
        FROM
          Drivers
        WHERE
          Drivers.join_date < date(
            '2020-' || printf('%02d', months.month) || '-01',
            '+1 month'
          )
      ) AS available_drivers
    FROM
      months
  ),
  working AS (
    SELECT
      available.month AS month,
      (
        SELECT
          COUNT(DISTINCT AcceptedRides.driver_id)
        FROM
          AcceptedRides
          JOIN Rides ON Rides.ride_id = AcceptedRides.ride_id
        WHERE
          strftime('%Y-%m', Rides.requested_at) = printf('2020-%02d', available.month)
      ) AS working_drivers,
      available.available_drivers AS available_drivers
    FROM
      available
  )
SELECT
  working.month AS month,
  CASE
    WHEN working.available_drivers = 0 THEN 0.0
    ELSE ROUND(
      working.working_drivers * 100.0 / working.available_drivers,
      2
    )
  END AS working_percentage
FROM
  working
ORDER BY
  working.month