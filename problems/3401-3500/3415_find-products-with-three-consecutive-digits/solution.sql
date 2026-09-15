-- A name qualifies when it has at least one digit and no maximal digit
-- run of any length other than three. Has-a-digit is one GLOB, and every
-- forbidden shape (runs of four or more, runs of one or two at the
-- start, the end, the middle, or the whole name) is one NOT GLOB.
SELECT
  product_id,
  name
FROM
  Products
WHERE
  name GLOB '*[0-9]*'
  AND name NOT GLOB '*[0-9][0-9][0-9][0-9]*'
  AND name NOT GLOB '[0-9]'
  AND name NOT GLOB '[0-9][0-9]'
  AND name NOT GLOB '[0-9][^0-9]*'
  AND name NOT GLOB '[0-9][0-9][^0-9]*'
  AND name NOT GLOB '*[^0-9][0-9]'
  AND name NOT GLOB '*[^0-9][0-9][0-9]'
  AND name NOT GLOB '*[^0-9][0-9][^0-9]*'
  AND name NOT GLOB '*[^0-9][0-9][0-9][^0-9]*'
ORDER BY
  product_id ASC