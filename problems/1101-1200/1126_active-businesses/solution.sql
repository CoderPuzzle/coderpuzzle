SELECT
  business_id
FROM
  (
    SELECT
      business_id,
      event_type,
      occurrences,
      AVG(occurrences) OVER (
        PARTITION BY
          event_type
      ) AS avg_occurrences
    FROM
      Events
  ) AS compared
WHERE
  occurrences > avg_occurrences
GROUP BY
  business_id
HAVING
  COUNT(*) > 1