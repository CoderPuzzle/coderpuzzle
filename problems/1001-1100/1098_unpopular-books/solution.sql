SELECT
  b.book_id,
  b.name
FROM
  Books b
WHERE
  b.available_from <= '2019-05-23'
  AND (
    SELECT
      COALESCE(SUM(o.quantity), 0)
    FROM
      Orders o
    WHERE
      o.book_id = b.book_id
      AND o.dispatch_date >= '2018-06-23'
      AND o.dispatch_date <= '2019-06-23'
  ) < 10