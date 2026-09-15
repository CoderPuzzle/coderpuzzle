WITH
  ordered AS (
    SELECT
      customer_id,
      julianday(transaction_date) AS day_number,
      LAG(julianday(transaction_date)) OVER (
        PARTITION BY
          customer_id
        ORDER BY
          transaction_date
      ) AS previous_day_number
    FROM
      Transactions
  ),
  marked AS (
    SELECT
      customer_id,
      day_number,
      CASE
        WHEN day_number - previous_day_number = 1 THEN 0
        ELSE 1
      END AS new_island
    FROM
      ordered
  ),
  islands AS (
    SELECT
      customer_id,
      SUM(new_island) OVER (
        PARTITION BY
          customer_id
        ORDER BY
          day_number
      ) AS island_id
    FROM
      marked
  ),
  streaks AS (
    SELECT
      customer_id,
      COUNT(*) AS streak
    FROM
      islands
    GROUP BY
      customer_id,
      island_id
  ),
  best AS (
    SELECT
      customer_id,
      MAX(streak) AS longest_streak
    FROM
      streaks
    GROUP BY
      customer_id
  )
SELECT
  customer_id
FROM
  best
WHERE
  longest_streak = (
    SELECT
      MAX(longest_streak)
    FROM
      best
  )
ORDER BY
  customer_id ASC