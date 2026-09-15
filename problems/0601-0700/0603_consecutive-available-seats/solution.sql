WITH
  neighbors AS (
    SELECT
      seat_id,
      free,
      LAG(seat_id) OVER (
        ORDER BY
          seat_id
      ) AS prev_id,
      LAG(free) OVER (
        ORDER BY
          seat_id
      ) AS prev_free,
      LEAD(seat_id) OVER (
        ORDER BY
          seat_id
      ) AS next_id,
      LEAD(free) OVER (
        ORDER BY
          seat_id
      ) AS next_free
    FROM
      Cinema
  )
SELECT
  seat_id
FROM
  neighbors
WHERE
  free = 1
  AND (
    (
      prev_id = seat_id - 1
      AND prev_free = 1
    )
    OR (
      next_id = seat_id + 1
      AND next_free = 1
    )
  )
ORDER BY
  seat_id ASC