-- Three independent ways to be invalid: the wrong number of octets (a dot
-- count other than three), a leading zero inside an octet, or an octet
-- value above 255. The dot count is length arithmetic on REPLACE, and
-- when it is exactly three, instr/substr peels the address into its four
-- octets for the per-octet checks.
WITH
  peel1 AS (
    SELECT
      ip,
      length(ip) - length(replace(ip, '.', '')) AS dots,
      substr(ip, 1, instr(ip, '.') - 1) AS o1,
      substr(ip, instr(ip, '.') + 1) AS rest
    FROM
      logs
  ),
  peel2 AS (
    SELECT
      ip,
      dots,
      o1,
      substr(rest, 1, instr(rest, '.') - 1) AS o2,
      substr(rest, instr(rest, '.') + 1) AS rest
    FROM
      peel1
  ),
  peel3 AS (
    SELECT
      ip,
      dots,
      o1,
      o2,
      substr(rest, 1, instr(rest, '.') - 1) AS o3,
      substr(rest, instr(rest, '.') + 1) AS o4
    FROM
      peel2
  )
SELECT
  ip,
  COUNT(*) AS invalid_count
FROM
  peel3
WHERE
  dots <> 3
  OR (
    length(o1) > 1
    AND substr(o1, 1, 1) = '0'
  )
  OR CAST(o1 AS INTEGER) > 255
  OR (
    length(o2) > 1
    AND substr(o2, 1, 1) = '0'
  )
  OR CAST(o2 AS INTEGER) > 255
  OR (
    length(o3) > 1
    AND substr(o3, 1, 1) = '0'
  )
  OR CAST(o3 AS INTEGER) > 255
  OR (
    length(o4) > 1
    AND substr(o4, 1, 1) = '0'
  )
  OR CAST(o4 AS INTEGER) > 255
GROUP BY
  ip
ORDER BY
  invalid_count DESC,
  ip DESC