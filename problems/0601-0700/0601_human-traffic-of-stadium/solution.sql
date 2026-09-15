WITH
  marked AS (
    SELECT
      id,
      visit_date,
      people,
      LAG(id, 2) OVER (
        ORDER BY
          id
      ) AS pid2,
      LAG(people, 2) OVER (
        ORDER BY
          id
      ) AS pp2,
      LAG(id, 1) OVER (
        ORDER BY
          id
      ) AS pid1,
      LAG(people, 1) OVER (
        ORDER BY
          id
      ) AS pp1,
      LEAD(id, 1) OVER (
        ORDER BY
          id
      ) AS nid1,
      LEAD(people, 1) OVER (
        ORDER BY
          id
      ) AS np1,
      LEAD(id, 2) OVER (
        ORDER BY
          id
      ) AS nid2,
      LEAD(people, 2) OVER (
        ORDER BY
          id
      ) AS np2
    FROM
      Stadium
  )
SELECT
  id,
  visit_date,
  people
FROM
  marked
WHERE
  (
    nid1 = id + 1
    AND nid2 = id + 2
    AND people >= 100
    AND np1 >= 100
    AND np2 >= 100
  )
  OR (
    pid1 = id - 1
    AND nid1 = id + 1
    AND pp1 >= 100
    AND people >= 100
    AND np1 >= 100
  )
  OR (
    pid2 = id - 2
    AND pid1 = id - 1
    AND pp2 >= 100
    AND pp1 >= 100
    AND people >= 100
  )
ORDER BY
  visit_date ASC