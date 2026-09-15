WITH
  islands AS (
    SELECT
      MIN(seat_id) AS first_seat_id,
      MAX(seat_id) AS last_seat_id,
      COUNT(*) AS consecutive_seats_len
    FROM
      (
        SELECT
          seat_id,
          seat_id - ROW_NUMBER() OVER (
            ORDER BY
              seat_id
          ) AS island
        FROM
          Cinema
        WHERE
          free = 1
      )
    GROUP BY
      island
  )
SELECT
  first_seat_id,
  last_seat_id,
  consecutive_seats_len
FROM
  islands
WHERE
  consecutive_seats_len = (
    SELECT
      MAX(consecutive_seats_len)
    FROM
      islands
  )
ORDER BY
  first_seat_id