SELECT
  s1.employee_id,
  COUNT(*) AS overlapping_shifts
FROM
  EmployeeShifts s1
  JOIN EmployeeShifts s2 ON s1.employee_id = s2.employee_id
WHERE
  s1.start_time < s2.start_time
  AND s1.end_time > s2.start_time
GROUP BY
  s1.employee_id
ORDER BY
  s1.employee_id