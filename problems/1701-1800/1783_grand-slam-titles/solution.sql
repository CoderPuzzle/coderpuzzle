SELECT
  Players.player_id AS player_id,
  Players.player_name AS player_name,
  COUNT(*) AS grand_slams_count
FROM
  Players
  JOIN (
    SELECT
      Wimbledon AS winner
    FROM
      Championships
    UNION ALL
    SELECT
      Fr_open
    FROM
      Championships
    UNION ALL
    SELECT
      US_open
    FROM
      Championships
    UNION ALL
    SELECT
      Au_open
    FROM
      Championships
  ) titles ON Players.player_id = titles.winner
GROUP BY
  Players.player_id,
  Players.player_name