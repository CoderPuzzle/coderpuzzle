SELECT DISTINCT
  a.user_id
FROM
  Sessions a,
  Sessions b
WHERE
  a.user_id = b.user_id
  AND a.session_type = b.session_type
  AND a.session_id <> b.session_id
  AND b.session_start >= a.session_start
  AND b.session_start <= datetime(a.session_end, '+12 hours')
ORDER BY
  a.user_id ASC