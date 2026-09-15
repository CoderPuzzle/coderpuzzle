WITH
  weekdays AS (
    SELECT
      strftime('%w', submit_date) AS wd
    FROM
      Tasks
  )
SELECT
  COALESCE(SUM(wd IN ('0', '6')), 0) AS weekend_cnt,
  COALESCE(SUM(wd NOT IN ('0', '6')), 0) AS working_cnt
FROM
  weekdays