WITH RECURSIVE
  chain (root_id, employee_id, depth) AS (
    SELECT
      employee_id,
      employee_id,
      1
    FROM
      Employees
    UNION ALL
    SELECT
      chain.root_id,
      e.employee_id,
      chain.depth + 1
    FROM
      chain
      JOIN Employees e ON e.manager_id = chain.employee_id
  ),
  levels AS (
    SELECT
      employee_id,
      depth
    FROM
      chain
    WHERE
      root_id = (
        SELECT
          employee_id
        FROM
          Employees
        WHERE
          manager_id IS NULL
      )
  ),
  teams AS (
    SELECT
      root_id,
      COUNT(*) - 1 AS team_size
    FROM
      chain
    GROUP BY
      root_id
  ),
  budgets AS (
    SELECT
      ch.root_id,
      SUM(em.salary) AS controlled
    FROM
      chain ch
      JOIN Employees em ON em.employee_id = ch.employee_id
    WHERE
      ch.root_id != ch.employee_id
    GROUP BY
      ch.root_id
  )
SELECT
  e.employee_id,
  e.employee_name,
  levels.depth AS level,
  COALESCE(teams.team_size, 0) AS team_size,
  COALESCE(budgets.controlled, 0) + e.salary AS budget
FROM
  Employees e
  JOIN levels ON levels.employee_id = e.employee_id
  LEFT JOIN teams ON teams.root_id = e.employee_id
  LEFT JOIN budgets ON budgets.root_id = e.employee_id
ORDER BY
  level ASC,
  budget DESC,
  e.employee_name ASC