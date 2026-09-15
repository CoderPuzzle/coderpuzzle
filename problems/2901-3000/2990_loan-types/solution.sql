SELECT
  user_id
FROM
  Loans
GROUP BY
  user_id
HAVING
  COUNT(
    CASE
      WHEN loan_type = 'Refinance' THEN 1
    END
  ) > 0
  AND COUNT(
    CASE
      WHEN loan_type = 'Mortgage' THEN 1
    END
  ) > 0
ORDER BY
  user_id