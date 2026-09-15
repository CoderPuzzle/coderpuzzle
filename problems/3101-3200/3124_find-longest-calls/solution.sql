WITH
  ranked AS (
    SELECT
      c.first_name,
      ca.type,
      ca.duration,
      PRINTF(
        '%02d:%02d:%02d',
        ca.duration / 3600,
        (ca.duration % 3600) / 60,
        ca.duration % 60
      ) AS duration_formatted,
      ROW_NUMBER() OVER (
        PARTITION BY
          ca.type
        ORDER BY
          ca.duration DESC,
          c.first_name DESC
      ) AS rn
    FROM
      Calls ca
      JOIN Contacts c ON c.id = ca.contact_id
  )
SELECT
  first_name,
  type,
  duration_formatted
FROM
  ranked
WHERE
  rn <= 3
ORDER BY
  type DESC,
  duration DESC,
  first_name DESC