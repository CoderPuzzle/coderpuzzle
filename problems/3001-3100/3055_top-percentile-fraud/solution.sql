SELECT
  policy_id,
  state,
  fraud_score
FROM
  (
    SELECT
      policy_id,
      state,
      fraud_score,
      PERCENT_RANK() OVER (
        PARTITION BY
          state
        ORDER BY
          fraud_score DESC
      ) AS pr
    FROM
      Fraud
  ) ranked
WHERE
  pr < 0.05
ORDER BY
  state ASC,
  fraud_score DESC,
  policy_id ASC