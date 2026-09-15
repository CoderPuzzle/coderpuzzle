WITH
  walls AS (
    SELECT
      id,
      height,
      MAX(height) OVER (
        ORDER BY
          id
      ) AS lft,
      MAX(height) OVER (
        ORDER BY
          id DESC
      ) AS rgt
    FROM
      Heights
  ),
  drops AS (
    SELECT
      MAX(MIN(lft, rgt) - height, 0) AS water
    FROM
      walls
  )
SELECT
  COALESCE(SUM(water), 0) AS total_trapped_water
FROM
  drops