SELECT
  username,
  activity,
  startDate,
  endDate
FROM
  (
    SELECT
      ua.username,
      ua.activity,
      ua.startDate,
      ua.endDate,
      ROW_NUMBER() OVER (
        PARTITION BY
          ua.username
        ORDER BY
          ua.startDate DESC
      ) AS rn,
      COUNT(*) OVER (
        PARTITION BY
          ua.username
      ) AS total
    FROM
      UserActivity ua
  )
WHERE
  rn = 2
  OR (
    rn = 1
    AND total = 1
  )