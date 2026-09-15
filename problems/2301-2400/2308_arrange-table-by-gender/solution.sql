WITH
  ranked AS (
    SELECT
      user_id,
      gender,
      ROW_NUMBER() OVER (
        PARTITION BY
          gender
        ORDER BY
          user_id
      ) AS rn
    FROM
      Genders
  )
SELECT
  user_id,
  gender
FROM
  ranked
ORDER BY
  rn,
  CASE gender
    WHEN 'female' THEN 0
    WHEN 'other' THEN 1
    ELSE 2
  END