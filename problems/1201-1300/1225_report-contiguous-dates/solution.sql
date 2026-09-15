WITH
  days AS (
    SELECT
      fail_date AS d,
      'failed' AS period_state
    FROM
      Failed
    WHERE
      fail_date BETWEEN '2019-01-01' AND '2019-12-31'
    UNION ALL
    SELECT
      success_date,
      'succeeded'
    FROM
      Succeeded
    WHERE
      success_date BETWEEN '2019-01-01' AND '2019-12-31'
  ),
  ordered AS (
    SELECT
      d,
      period_state,
      ROW_NUMBER() OVER (
        ORDER BY
          d
      ) - ROW_NUMBER() OVER (
        PARTITION BY
          period_state
        ORDER BY
          d
      ) AS island
    FROM
      days
  )
SELECT
  period_state,
  MIN(d) AS start_date,
  MAX(d) AS end_date
FROM
  ordered
GROUP BY
  period_state,
  island
ORDER BY
  start_date