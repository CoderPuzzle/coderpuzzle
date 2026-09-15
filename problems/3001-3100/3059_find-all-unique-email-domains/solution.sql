SELECT
  SUBSTR(email, INSTR(email, '@') + 1) AS email_domain,
  COUNT(*) AS count
FROM
  Emails
GROUP BY
  email_domain
HAVING
  email_domain LIKE '%.com'
ORDER BY
  email_domain ASC