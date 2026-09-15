WITH
  totals AS (
    SELECT
      country,
      winery,
      SUM(points) AS total_points
    FROM
      Wineries
    GROUP BY
      country,
      winery
  ),
  ranked AS (
    SELECT
      country,
      winery,
      total_points,
      ROW_NUMBER() OVER (
        PARTITION BY
          country
        ORDER BY
          total_points DESC,
          winery
      ) AS rn
    FROM
      totals
  )
SELECT
  country,
  MAX(
    CASE
      WHEN rn = 1 THEN winery || ' (' || total_points || ')'
    END
  ) AS top_winery,
  COALESCE(
    MAX(
      CASE
        WHEN rn = 2 THEN winery || ' (' || total_points || ')'
      END
    ),
    'No second winery'
  ) AS second_winery,
  COALESCE(
    MAX(
      CASE
        WHEN rn = 3 THEN winery || ' (' || total_points || ')'
      END
    ),
    'No third winery'
  ) AS third_winery
FROM
  ranked
GROUP BY
  country
ORDER BY
  country