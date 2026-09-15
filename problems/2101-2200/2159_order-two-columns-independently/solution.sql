WITH
  first_ranked AS (
    SELECT
      first_col,
      ROW_NUMBER() OVER (
        ORDER BY
          first_col
      ) AS row_num
    FROM
      Data
  ),
  second_ranked AS (
    SELECT
      second_col,
      ROW_NUMBER() OVER (
        ORDER BY
          second_col DESC
      ) AS row_num
    FROM
      Data
  )
SELECT
  first_ranked.first_col,
  second_ranked.second_col
FROM
  first_ranked
  JOIN second_ranked ON first_ranked.row_num = second_ranked.row_num
ORDER BY
  first_ranked.row_num