SELECT
  m.member_id,
  m.name,
  CASE
    WHEN COUNT(v.visit_id) = 0 THEN 'Bronze'
    WHEN COUNT(p.visit_id) * 100 >= COUNT(v.visit_id) * 80 THEN 'Diamond'
    WHEN COUNT(p.visit_id) * 100 >= COUNT(v.visit_id) * 50 THEN 'Gold'
    ELSE 'Silver'
  END AS category
FROM
  Members AS m
  LEFT JOIN Visits AS v ON v.member_id = m.member_id
  LEFT JOIN Purchases AS p ON p.visit_id = v.visit_id
GROUP BY
  m.member_id,
  m.name