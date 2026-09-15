SELECT
  a.team_name AS home_team,
  b.team_name AS away_team
FROM
  Teams a
  JOIN Teams b ON a.team_name <> b.team_name