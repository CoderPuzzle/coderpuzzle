SELECT
  COUNT(*) AS accounts_count
FROM
  Subscriptions s
WHERE
  s.start_date <= '2021-12-31'
  AND s.end_date >= '2021-01-01'
  AND NOT EXISTS (
    SELECT
      1
    FROM
      Streams st
    WHERE
      st.account_id = s.account_id
      AND st.stream_date >= '2021-01-01'
      AND st.stream_date <= '2021-12-31'
  )