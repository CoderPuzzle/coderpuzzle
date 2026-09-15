WITH
  before_ranked AS (
    SELECT
      team_id,
      ROW_NUMBER() OVER (
        ORDER BY
          points DESC,
          name
      ) AS old_rank
    FROM
      TeamPoints
  ),
  after_points AS (
    SELECT
      tp.team_id,
      tp.name,
      tp.points + pc.points_change AS new_points
    FROM
      TeamPoints tp
      JOIN PointsChange pc ON pc.team_id = tp.team_id
  ),
  after_ranked AS (
    SELECT
      team_id,
      ROW_NUMBER() OVER (
        ORDER BY
          new_points DESC,
          name
      ) AS new_rank
    FROM
      after_points
  )
SELECT
  br.team_id,
  ap.name,
  br.old_rank - ar.new_rank AS rank_diff
FROM
  before_ranked br
  JOIN after_ranked ar ON ar.team_id = br.team_id
  JOIN after_points ap ON ap.team_id = br.team_id
ORDER BY
  br.team_id