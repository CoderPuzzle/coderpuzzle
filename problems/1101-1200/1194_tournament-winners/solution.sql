SELECT
  group_id,
  player_id
FROM
  (
    SELECT
      p.group_id,
      p.player_id,
      ROW_NUMBER() OVER (
        PARTITION BY
          p.group_id
        ORDER BY
          COALESCE(t.total, 0) DESC,
          p.player_id
      ) AS rank_in_group
    FROM
      Players AS p
      LEFT JOIN (
        SELECT
          scorer,
          SUM(points) AS total
        FROM
          (
            SELECT
              first_player AS scorer,
              first_score AS points
            FROM
              Matches
            UNION ALL
            SELECT
              second_player AS scorer,
              second_score AS points
            FROM
              Matches
          ) AS events
        GROUP BY
          scorer
      ) AS t ON p.player_id = t.scorer
  ) AS ranked
WHERE
  rank_in_group = 1