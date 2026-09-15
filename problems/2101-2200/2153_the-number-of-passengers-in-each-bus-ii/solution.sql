WITH
  events AS (
    SELECT
      arrival_time,
      0 AS event_kind,
      NULL AS bus_id,
      NULL AS capacity,
      1 AS passenger_delta
    FROM
      Passengers
    UNION ALL
    SELECT
      arrival_time,
      1 AS event_kind,
      bus_id,
      capacity,
      0 AS passenger_delta
    FROM
      Buses
  ),
  running AS (
    SELECT
      arrival_time,
      event_kind,
      bus_id,
      capacity,
      SUM(passenger_delta) OVER (
        ORDER BY
          arrival_time,
          event_kind ROWS BETWEEN UNBOUNDED PRECEDING
          AND CURRENT ROW
      ) AS waiting
    FROM
      events
  ),
  bus_rows AS (
    SELECT
      bus_id,
      arrival_time,
      capacity,
      waiting
    FROM
      running
    WHERE
      event_kind = 1
  ),
  cumulative AS (
    SELECT
      bus_id,
      arrival_time,
      waiting,
      SUM(capacity) OVER (
        ORDER BY
          arrival_time ROWS BETWEEN UNBOUNDED PRECEDING
          AND CURRENT ROW
      ) AS capacity_sum
    FROM
      bus_rows
  ),
  boarded_total AS (
    SELECT
      bus_id,
      arrival_time,
      capacity_sum + MIN(
        CASE
          WHEN waiting < capacity_sum THEN waiting - capacity_sum
          ELSE 0
        END
      ) OVER (
        ORDER BY
          arrival_time ROWS BETWEEN UNBOUNDED PRECEDING
          AND CURRENT ROW
      ) AS total_boarded
    FROM
      cumulative
  )
SELECT
  bus_id,
  total_boarded - LAG(total_boarded, 1, 0) OVER (
    ORDER BY
      arrival_time
  ) AS passengers_cnt
FROM
  boarded_total
ORDER BY
  bus_id