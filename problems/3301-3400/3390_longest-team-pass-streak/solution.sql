SELECT
  teams.team_name,
  COALESCE(MAX(runs.streak_len), 0) AS longest_streak
FROM
  Teams teams
  LEFT JOIN (
    SELECT
      team_name,
      COUNT(*) OVER (
        PARTITION BY
          team_name,
          fail_cnt
      ) AS streak_len
    FROM
      (
        SELECT
          f.team_name AS team_name,
          CASE
            WHEN r.team_name = f.team_name THEN 1
            ELSE 0
          END AS ok,
          SUM(
            CASE
              WHEN r.team_name = f.team_name THEN 0
              ELSE 1
            END
          ) OVER (
            PARTITION BY
              f.team_name
            ORDER BY
              p.time_stamp,
              p.pass_from,
              p.pass_to ROWS UNBOUNDED PRECEDING
          ) AS fail_cnt
        FROM
          Passes p
          JOIN Teams f ON f.player_id = p.pass_from
          JOIN Teams r ON r.player_id = p.pass_to
      )
    WHERE
      ok = 1
  ) runs ON runs.team_name = teams.team_name
GROUP BY
  teams.team_name
ORDER BY
  teams.team_name