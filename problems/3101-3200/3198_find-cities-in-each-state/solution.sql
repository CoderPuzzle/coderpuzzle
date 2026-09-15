SELECT
  state,
  GROUP_CONCAT(
    city,
    ', '
    ORDER BY
      city
  ) AS cities
FROM
  cities
GROUP BY
  state
ORDER BY
  state