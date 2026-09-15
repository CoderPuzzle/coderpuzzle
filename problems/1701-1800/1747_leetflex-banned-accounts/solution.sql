SELECT DISTINCT
  a.account_id AS account_id
FROM
  LogInfo a
  JOIN LogInfo b ON a.account_id = b.account_id
  AND a.ip_address != b.ip_address
  AND a.login <= b.logout
  AND a.logout >= b.login