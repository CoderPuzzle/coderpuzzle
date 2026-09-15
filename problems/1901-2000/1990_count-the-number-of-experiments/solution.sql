SELECT
  p.platform,
  e.experiment_name,
  COUNT(x.experiment_id) AS num_experiments
FROM
  (
    SELECT
      'Android' AS platform
    UNION
    SELECT
      'IOS'
    UNION
    SELECT
      'Web'
  ) p
  CROSS JOIN (
    SELECT
      'Reading' AS experiment_name
    UNION
    SELECT
      'Sports'
    UNION
    SELECT
      'Programming'
  ) e
  LEFT JOIN Experiments x ON x.platform = p.platform
  AND x.experiment_name = e.experiment_name
GROUP BY
  p.platform,
  e.experiment_name