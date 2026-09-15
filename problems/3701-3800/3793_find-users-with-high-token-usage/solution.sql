SELECT
  user_id,
  COUNT(*) AS prompt_count,
  ROUND(AVG(tokens * 1.0), 2) AS avg_tokens
FROM
  Prompts
GROUP BY
  user_id
HAVING
  COUNT(*) >= 3
  AND MAX(tokens) > AVG(tokens)
ORDER BY
  avg_tokens DESC,
  user_id ASC