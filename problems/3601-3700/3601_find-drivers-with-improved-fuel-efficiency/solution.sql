SELECT
  driver_id,
  driver_name,
  ROUND(
    AVG(
      CASE
        WHEN m <= 6 THEN eff
      END
    ),
    2
  ) AS first_half_avg,
  ROUND(
    AVG(
      CASE
        WHEN m >= 7 THEN eff
      END
    ),
    2
  ) AS second_half_avg,
  ROUND(
    AVG(
      CASE
        WHEN m >= 7 THEN eff
      END
    ) - AVG(
      CASE
        WHEN m <= 6 THEN eff
      END
    ),
    2
  ) AS efficiency_improvement
FROM
  (
    SELECT
      d.driver_id AS driver_id,
      d.driver_name AS driver_name,
      CAST(strftime('%m', t.trip_date) AS INTEGER) AS m,
      t.distance_km / t.fuel_consumed AS eff
    FROM
      drivers d
      JOIN trips t ON t.driver_id = d.driver_id
  )
GROUP BY
  driver_id,
  driver_name
HAVING
  SUM(m <= 6) > 0
  AND SUM(m >= 7) > 0
ORDER BY
  efficiency_improvement DESC,
  driver_name ASC