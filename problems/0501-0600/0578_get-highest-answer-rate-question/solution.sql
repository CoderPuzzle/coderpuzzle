SELECT
  question_id AS survey_log
FROM
  SurveyLog
GROUP BY
  question_id
HAVING
  SUM(
    CASE
      WHEN action = 'show' THEN 1
      ELSE 0
    END
  ) > 0
ORDER BY
  SUM(
    CASE
      WHEN action = 'answer' THEN 1
      ELSE 0
    END
  ) * 1.0 / SUM(
    CASE
      WHEN action = 'show' THEN 1
      ELSE 0
    END
  ) DESC,
  question_id
LIMIT
  1