SELECT
  id,
  name,
  CASE sex
    WHEN 'm' THEN 'f'
    ELSE 'm'
  END AS sex,
  salary
FROM
  Salary