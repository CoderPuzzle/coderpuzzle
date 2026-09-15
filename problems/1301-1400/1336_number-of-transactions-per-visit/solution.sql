WITH
  per_visit AS (
    SELECT
      v.user_id AS user_id,
      v.visit_date AS visit_date,
      COUNT(t.amount) AS cnt
    FROM
      Visits v
      LEFT JOIN Transactions t ON t.user_id = v.user_id
      AND t.transaction_date = v.visit_date
    GROUP BY
      v.user_id,
      v.visit_date
  ),
  tally AS (
    SELECT
      0 AS n
    UNION ALL
    SELECT
      n + 1
    FROM
      tally
    WHERE
      n + 1 <= (
        SELECT
          MAX(cnt)
        FROM
          per_visit
      )
  )
SELECT
  tally.n AS transactions_count,
  (
    SELECT
      COUNT(*)
    FROM
      per_visit
    WHERE
      per_visit.cnt = tally.n
  ) AS visits_count
FROM
  tally
ORDER BY
  transactions_count