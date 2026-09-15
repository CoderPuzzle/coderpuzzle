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
  monthly AS (
    SELECT
      months.month AS month,
      COALESCE(
        (
          SELECT
            SUM(AcceptedRides.ride_distance)
          FROM
            AcceptedRides
            JOIN Rides ON Rides.ride_id = AcceptedRides.ride_id
          WHERE
            strftime('%Y-%m', Rides.requested_at) = printf('2020-%02d', months.month)
        ),
        0
      ) AS total_distance,
      COALESCE(
        (
          SELECT
            SUM(AcceptedRides.ride_duration)
          FROM
            AcceptedRides
            JOIN Rides ON Rides.ride_id = AcceptedRides.ride_id
          WHERE
            strftime('%Y-%m', Rides.requested_at) = printf('2020-%02d', months.month)
        ),
        0
      ) AS total_duration
    FROM
      months
  )
SELECT
  starts.month AS month,
  ROUND(
    (
      SELECT
        SUM(monthly.total_distance)
      FROM
        monthly
      WHERE
        monthly.month BETWEEN starts.month AND starts.month  + 2
    ) / 3.0,
    2
  ) AS average_ride_distance,
  ROUND(
    (
      SELECT
        SUM(monthly.total_duration)
      FROM
        monthly
      WHERE
        monthly.month BETWEEN starts.month AND starts.month  + 2
    ) / 3.0,
    2
  ) AS average_ride_duration
FROM
  (
    SELECT
      month
    FROM
      months
    WHERE
      month <= 10
  ) starts
ORDER BY
  starts.month