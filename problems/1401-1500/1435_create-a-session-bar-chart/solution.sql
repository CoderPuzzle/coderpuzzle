SELECT
  '[0-5>' AS bin,
  COUNT(*) AS total
FROM
  Sessions
WHERE
  duration < 300
UNION ALL
SELECT
  '[5-10>' AS bin,
  COUNT(*) AS total
FROM
  Sessions
WHERE
  duration >= 300
  AND duration < 600
UNION ALL
SELECT
  '[10-15>' AS bin,
  COUNT(*) AS total
FROM
  Sessions
WHERE
  duration >= 600
  AND duration < 900
UNION ALL
SELECT
  '15 or more' AS bin,
  COUNT(*) AS total
FROM
  Sessions
WHERE
  duration >= 900