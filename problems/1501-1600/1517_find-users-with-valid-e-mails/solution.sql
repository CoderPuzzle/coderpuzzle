SELECT
  user_id,
  name,
  mail
FROM
  (
    SELECT
      *,
      substr(mail, 1, length(mail) - 13) AS local_part,
      substr(mail, -13) AS domain_part
    FROM
      Users
  )
WHERE
  domain_part = '@leetcode.com'
  AND local_part GLOB '[a-zA-Z]*'
  AND local_part NOT GLOB '*[^a-zA-Z0-9_.-]*'