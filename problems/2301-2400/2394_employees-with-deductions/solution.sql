SELECT
  employee_id
FROM
  Employees
WHERE
  needed_hours * 60 > COALESCE(
    (
      SELECT
        SUM(
          CAST(
            CEIL(
              (
                strftime('%s', out_time) - strftime('%s', in_time)
              ) / 60.0
            ) AS INTEGER
          )
        )
      FROM
        Logs
      WHERE
        Logs.employee_id = Employees.employee_id
    ),
    0
  )