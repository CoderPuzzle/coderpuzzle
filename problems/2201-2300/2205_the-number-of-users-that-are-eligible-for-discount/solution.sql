SELECT
  COUNT(DISTINCT user_id) AS user_cnt
FROM
  Purchases
WHERE
  time_stamp >= '2022-03-08 00:00:00'
  AND time_stamp <= '2022-03-20 00:00:00'
  AND amount >= 1000