WITH
  dept AS (
    SELECT
      SUBSTR(pay_date, 1, 7) AS pay_month,
      department_id,
      AVG(amount) AS dept_average
    FROM
      Salary
      JOIN Employee ON Salary.employee_id = Employee.employee_id
    GROUP BY
      pay_month,
      department_id
  ),
  company AS (
    SELECT
      SUBSTR(pay_date, 1, 7) AS pay_month,
      AVG(amount) AS company_average
    FROM
      Salary
    GROUP BY
      pay_month
  )
SELECT
  REPLACE(d.pay_month, '/', '-') AS pay_month,
  d.department_id,
  CASE
    WHEN d.dept_average > c.company_average THEN 'higher'
    WHEN d.dept_average < c.company_average THEN 'lower'
    ELSE 'same'
  END AS comparison
FROM
  dept d
  JOIN company c ON d.pay_month = c.pay_month