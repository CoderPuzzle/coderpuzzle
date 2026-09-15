SELECT
  spend_date,
  platform,
  SUM(total_amount) AS total_amount,
  SUM(total_users) AS total_users
FROM
  (
    SELECT
      spend_date,
      platform,
      SUM(amount) AS total_amount,
      COUNT(*) AS total_users
    FROM
      (
        SELECT
          user_id,
          spend_date,
          CASE
            WHEN COUNT(DISTINCT platform) = 2 THEN 'both'
            ELSE MAX(platform)
          END AS platform,
          SUM(amount) AS amount
        FROM
          Spending
        GROUP BY
          user_id,
          spend_date
      ) AS classified
    GROUP BY
      spend_date,
      platform
    UNION ALL
    SELECT DISTINCT
      spend_date,
      'both' AS platform,
      0 AS total_amount,
      0 AS total_users
    FROM
      Spending
  ) AS padded
GROUP BY
  spend_date,
  platform