WITH
  stay AS (
    SELECT
      car_id,
      lot_id,
      fee_paid,
      CAST(strftime('%s', exit_time) AS INTEGER) - CAST(strftime('%s', entry_time) AS INTEGER) AS secs
    FROM
      ParkingTransactions
  ),
  totals AS (
    SELECT
      car_id,
      SUM(fee_paid) AS total_fee_paid,
      ROUND(SUM(fee_paid) * 3600.0 / SUM(secs), 2) AS avg_hourly_fee
    FROM
      stay
    GROUP BY
      car_id
  ),
  per_lot AS (
    SELECT
      car_id,
      lot_id,
      SUM(secs) AS lot_secs
    FROM
      stay
    GROUP BY
      car_id,
      lot_id
  ),
  ranked AS (
    SELECT
      car_id,
      lot_id,
      ROW_NUMBER() OVER (
        PARTITION BY
          car_id
        ORDER BY
          lot_secs DESC,
          lot_id ASC
      ) AS rn
    FROM
      per_lot
  )
SELECT
  t.car_id,
  t.total_fee_paid,
  t.avg_hourly_fee,
  r.lot_id AS most_time_lot
FROM
  totals t
  JOIN ranked r ON r.car_id = t.car_id
WHERE
  r.rn = 1
ORDER BY
  t.car_id