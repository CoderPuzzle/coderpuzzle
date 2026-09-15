SELECT
  product,
  quarter,
  sales
FROM
  (
    SELECT
      row_position,
      product,
      'quarter_1' AS quarter,
      quarter_1 AS sales
    FROM
      report
    UNION ALL
    SELECT
      row_position,
      product,
      'quarter_2' AS quarter,
      quarter_2 AS sales
    FROM
      report
    UNION ALL
    SELECT
      row_position,
      product,
      'quarter_3' AS quarter,
      quarter_3 AS sales
    FROM
      report
    UNION ALL
    SELECT
      row_position,
      product,
      'quarter_4' AS quarter,
      quarter_4 AS sales
    FROM
      report
  )
ORDER BY
  quarter ASC,
  row_position ASC