WITH
  ranked AS (
    SELECT
      player_id,
      result,
      ROW_NUMBER() OVER (
        PARTITION BY
          player_id
        ORDER BY
          match_day
      ) AS match_no,
      ROW_NUMBER() OVER (
        PARTITION BY
          player_id,
          result
        ORDER BY
          match_day
      ) AS result_no
    FROM
      Matches
  ),
  streaks AS (
    SELECT
      player_id,
      result,
      match_no - result_no AS streak_id
    FROM
      ranked
  ),
  wins AS (
    SELECT
      player_id,
      streak_id,
      COUNT(*) AS streak_length
    FROM
      streaks
    WHERE
      result = 'Win'
    GROUP BY
      player_id,
      streak_id
  )
SELECT
  m.player_id,
  COALESCE(MAX(w.streak_length), 0) AS longest_streak
FROM
  (
    SELECT DISTINCT
      player_id
    FROM
      Matches
  ) m
  LEFT JOIN wins w ON w.player_id = m.player_id
GROUP BY
  m.player_id