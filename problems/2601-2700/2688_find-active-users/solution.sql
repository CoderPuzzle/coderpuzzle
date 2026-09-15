SELECT DISTINCT
  a.user_id AS user_id
FROM
  Users a
  JOIN Users b ON a.user_id = b.user_id
  AND b.rowid > a.rowid
WHERE
  ABS(julianday(a.created_at) - julianday(b.created_at)) <= 7