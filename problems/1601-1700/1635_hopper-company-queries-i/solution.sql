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
  )
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
  ) AS active_drivers,
  (
    SELECT
      COUNT(*)
    FROM
      AcceptedRides
      JOIN Rides ON Rides.ride_id = AcceptedRides.ride_id
    WHERE
      strftime('%Y-%m', Rides.requested_at) = printf('2020-%02d', months.month)
  ) AS accepted_rides
FROM
  months
ORDER BY
  months.month