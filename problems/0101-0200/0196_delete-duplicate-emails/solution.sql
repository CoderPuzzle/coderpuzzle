SELECT
  id,
  email
FROM
  Person
WHERE
  id IN (
    SELECT
      MIN(id)
    FROM
      Person
    GROUP BY
      email
  )