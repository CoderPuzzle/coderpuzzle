SELECT
  activity
FROM
  (
    SELECT
      activity,
      COUNT(*) AS participants,
      MAX(COUNT(*)) OVER () AS hi,
      MIN(COUNT(*)) OVER () AS lo
    FROM
      Friends
    GROUP BY
      activity
  ) counted
WHERE
  participants < counted.hi
  AND participants > counted.lo