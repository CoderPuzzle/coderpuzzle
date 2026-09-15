WITH
  edges AS (
    SELECT
      user_id1 AS x,
      user_id2 AS y
    FROM
      Friends
    UNION
    SELECT
      user_id2 AS x,
      user_id1 AS y
    FROM
      Friends
  )
SELECT
  f.user_id1,
  f.user_id2
FROM
  Friends f
WHERE
  NOT EXISTS (
    SELECT
      1
    FROM
      edges e1
      INNER JOIN edges e2 ON e1.y = e2.y
    WHERE
      e1.x = f.user_id1
      AND e2.x = f.user_id2
      AND e1.y <> f.user_id1
      AND e1.y <> f.user_id2
  )
ORDER BY
  f.user_id1 ASC,
  f.user_id2 ASC