SELECT
  project_id,
  candidate_id,
  score
FROM
  (
    SELECT
      project_id,
      candidate_id,
      score,
      ROW_NUMBER() OVER (
        PARTITION BY
          project_id
        ORDER BY
          score DESC,
          candidate_id
      ) AS rn
    FROM
      (
        SELECT
          p.project_id AS project_id,
          c.candidate_id AS candidate_id,
          100 + 10 * SUM(
            CASE
              WHEN c.proficiency > p.importance THEN 1
              ELSE 0
            END
          ) - 5 * SUM(
            CASE
              WHEN c.proficiency < p.importance THEN 1
              ELSE 0
            END
          ) AS score,
          COUNT(*) AS matched,
          (
            SELECT
              COUNT(*)
            FROM
              Projects p2
            WHERE
              p2.project_id = p.project_id
          ) AS needed
        FROM
          Projects p
          JOIN Candidates c ON c.skill = p.skill
        GROUP BY
          p.project_id,
          c.candidate_id
      )
    WHERE
      matched = needed
  )
WHERE
  rn = 1
ORDER BY
  project_id