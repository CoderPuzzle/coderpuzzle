SELECT
  CASE
    WHEN id % 2 = 1
    AND id < (
      SELECT
        MAX(id)
      FROM
        Seat
    ) THEN id + 1
    WHEN id % 2 = 1 THEN id
    ELSE id - 1
  END AS id,
  student
FROM
  Seat
ORDER BY
  id ASC