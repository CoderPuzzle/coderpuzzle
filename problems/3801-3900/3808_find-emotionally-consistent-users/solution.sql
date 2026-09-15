WITH
  per_user AS (
    SELECT
      user_id,
      COUNT(DISTINCT content_id) AS item_cnt,
      COUNT(*) AS reaction_cnt
    FROM
      Reactions
    GROUP BY
      user_id
  ),
  per_reaction AS (
    SELECT
      user_id,
      reaction,
      COUNT(*) AS cnt
    FROM
      Reactions
    GROUP BY
      user_id,
      reaction
  )
SELECT
  p.user_id,
  r.reaction AS dominant_reaction,
  ROUND(r.cnt * 1.0 / p.reaction_cnt, 2) AS reaction_ratio
FROM
  per_user AS p
  JOIN per_reaction AS r ON r.user_id = p.user_id
WHERE
  p.item_cnt >= 5
  AND r.cnt * 1.0 / p.reaction_cnt >= 0.6
ORDER BY
  reaction_ratio DESC,
  p.user_id ASC