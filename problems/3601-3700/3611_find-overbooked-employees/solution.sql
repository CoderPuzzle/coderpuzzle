SELECT
  e.employee_id,
  e.employee_name,
  e.department,
  COUNT(*) AS meeting_heavy_weeks
FROM
  employees e
  JOIN (
    SELECT
      employee_id,
      date(meeting_date, 'weekday 0', '-6 days') AS week_start,
      SUM(duration_hours) AS weekly_hours
    FROM
      meetings
    GROUP BY
      employee_id,
      date(meeting_date, 'weekday 0', '-6 days')
    HAVING
      SUM(duration_hours) > 20
  ) w ON w.employee_id = e.employee_id
GROUP BY
  e.employee_id,
  e.employee_name,
  e.department
HAVING
  COUNT(*) >= 2
ORDER BY
  meeting_heavy_weeks DESC,
  e.employee_name ASC