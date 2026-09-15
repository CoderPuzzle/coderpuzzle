SELECT
  t.team_name,
  h.half_number,
  SUM(
    CASE
      WHEN p.pass_to IS NULL THEN 0
      WHEN (
        SELECT
          team_name
        FROM
          Teams
        WHERE
          player_id = p.pass_to
      ) = t.team_name THEN 1
      ELSE - 1
    END
  ) AS dominance
FROM
  Teams t
  CROSS JOIN (
    SELECT
      1 AS half_number
    UNION ALL
    SELECT
      2
  ) h
  LEFT JOIN Passes p ON p.pass_from = t.player_id
  AND (
    (
      h.half_number = 1
      AND p.time_stamp <= '45:00'
    )
    OR (
      h.half_number = 2
      AND p.time_stamp > '45:00'
    )
  )
GROUP BY
  t.team_name,
  h.half_number
ORDER BY
  t.team_name,
  h.half_number