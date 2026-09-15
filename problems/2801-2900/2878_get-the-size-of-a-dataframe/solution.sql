WITH
  row_count AS (
    SELECT
      COUNT(*) AS n
    FROM
      Players
  ),
  column_count AS (
    SELECT
      COUNT(*) AS n
    FROM
      PlayerColumns
  )
SELECT
  row_count.n AS number_of_rows,
  column_count.n AS number_of_columns
FROM
  row_count
  CROSS JOIN column_count