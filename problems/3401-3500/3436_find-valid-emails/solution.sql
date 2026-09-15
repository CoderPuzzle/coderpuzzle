-- Four criteria, four checks. Exactly one '@' is length arithmetic on
-- REPLACE, and once that holds the address splits at the single '@'
-- into a local part (non-empty, only [a-zA-Z0-9_]) and a rest that must
-- end in '.com' with a non-empty letters-only domain in front of it.
SELECT
  user_id,
  email
FROM
  (
    SELECT
      user_id,
      email,
      substr(email, 1, instr(email, '@') - 1) AS local_part,
      substr(email, instr(email, '@') + 1) AS rest_part
    FROM
      Users
    WHERE
      length(email) - length(replace(email, '@', '')) = 1
  )
WHERE
  length(local_part) > 0
  AND local_part NOT GLOB '*[^a-zA-Z0-9_]*'
  AND rest_part GLOB '*.com'
  AND length(rest_part) > 4
  AND substr(rest_part, 1, length(rest_part) - 4) NOT GLOB '*[^a-zA-Z]*'
ORDER BY
  user_id ASC