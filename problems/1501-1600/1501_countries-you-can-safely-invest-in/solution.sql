WITH
  country_calls AS (
    SELECT
      co.name AS country,
      c.duration AS duration
    FROM
      Calls c
      JOIN Person p ON c.caller_id = p.id
      JOIN Country co ON co.country_code = SUBSTR(p.phone_number, 1, 3)
    UNION ALL
    SELECT
      co.name AS country,
      c.duration AS duration
    FROM
      Calls c
      JOIN Person p ON c.callee_id = p.id
      JOIN Country co ON co.country_code = SUBSTR(p.phone_number, 1, 3)
  )
SELECT
  country
FROM
  country_calls
GROUP BY
  country
HAVING
  AVG(duration) > (
    SELECT
      AVG(duration)
    FROM
      country_calls
  )