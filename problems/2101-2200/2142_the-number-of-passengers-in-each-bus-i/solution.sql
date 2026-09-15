WITH
  events AS (
    SELECT
      arrival_time,
      0 AS event_kind,
      NULL AS bus_id,
      1 AS passenger_delta
    FROM
      Passengers
    UNION ALL
    SELECT
      arrival_time,
      1 AS event_kind,
      bus_id,
      0 AS passenger_delta
    FROM
      Buses
  ),
  running AS (
    SELECT
      arrival_time,
      event_kind,
      bus_id,
      SUM(passenger_delta) OVER (
        ORDER BY
          arrival_time,
          event_kind ROWS BETWEEN UNBOUNDED PRECEDING
          AND CURRENT ROW
      ) AS arrived_count
    FROM
      events
  ),
  bus_totals AS (
    SELECT
      bus_id,
      arrival_time,
      arrived_count
    FROM
      running
    WHERE
      event_kind = 1
  ),
  bus_counts AS (
    SELECT
      bus_id,
      arrived_count - LAG(arrived_count, 1, 0) OVER (
        ORDER BY
          arrival_time
      ) AS passengers_cnt
    FROM
      bus_totals
  )
SELECT
  bus_id,
  passengers_cnt
FROM
  bus_counts
ORDER BY
  bus_id