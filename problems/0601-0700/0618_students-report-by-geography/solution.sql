WITH
  numbered AS (
    SELECT
      continent,
      name,
      ROW_NUMBER() OVER (
        PARTITION BY
          continent
        ORDER BY
          name
      ) AS rn
    FROM
      Student
  )
SELECT
  MAX(
    CASE
      WHEN continent = 'America' THEN name
    END
  ) AS America,
  MAX(
    CASE
      WHEN continent = 'Asia' THEN name
    END
  ) AS Asia,
  MAX(
    CASE
      WHEN continent = 'Europe' THEN name
    END
  ) AS Europe
FROM
  numbered
GROUP BY
  rn