SELECT
  u.user_id,
  u.name,
  COALESCE(SUM(r.distance), 0) AS traveled_distance
FROM
  Users u
  LEFT JOIN Rides r ON r.user_id = u.user_id
GROUP BY
  u.user_id,
  u.name
ORDER BY
  u.user_id ASC