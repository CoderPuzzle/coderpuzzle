SELECT
  'bull' AS word,
  COUNT(*) AS count
FROM
  Files
WHERE
  ' ' || content || ' ' GLOB '* bull *'
UNION ALL
SELECT
  'bear' AS word,
  COUNT(*) AS count
FROM
  Files
WHERE
  ' ' || content || ' ' GLOB '* bear *'