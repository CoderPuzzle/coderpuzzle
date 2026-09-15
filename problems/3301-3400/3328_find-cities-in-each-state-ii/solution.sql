SELECT
  state,
  GROUP_CONCAT(city, ', ') AS cities,
  SUM(SUBSTR(state, 1, 1) = SUBSTR(city, 1, 1)) AS matching_letter_count
FROM
  (
    SELECT
      state,
      city
    FROM
      cities
    ORDER BY
      REPLACE(LOWER(city), ' ', ''),
      city
    LIMIT
      -1
    OFFSET
      0
  )
GROUP BY
  state
HAVING
  COUNT(*) >= 3
  AND SUM(SUBSTR(state, 1, 1) = SUBSTR(city, 1, 1)) >= 1
ORDER BY
  matching_letter_count DESC,
  state