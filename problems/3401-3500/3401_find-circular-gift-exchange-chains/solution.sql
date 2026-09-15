WITH RECURSIVE
  -- An employee sits on a continuous loop only when they give exactly one
  -- gift and receive exactly one gift over the whole table.
  participants AS (
    SELECT
      giver_id AS employee
    FROM
      SecretSanta
    GROUP BY
      giver_id
    HAVING
      COUNT(*) = 1
    INTERSECT
    SELECT
      receiver_id
    FROM
      SecretSanta
    GROUP BY
      receiver_id
    HAVING
      COUNT(*) = 1
  ),
  -- Rows whose both ends qualify, and together these form the loops.
  chain_edges AS (
    SELECT
      s.giver_id,
      s.receiver_id,
      s.gift_value
    FROM
      SecretSanta s
    WHERE
      s.giver_id IN (
        SELECT
          employee
        FROM
          participants
      )
      AND s.receiver_id IN (
        SELECT
          employee
        FROM
          participants
      )
  ),
  -- Walk each loop starting from each member. A walk stops exactly where
  -- it began, and low tracks the smallest employee id it has passed.
  walk (start_id, node, total, steps, low) AS (
    SELECT
      giver_id,
      receiver_id,
      gift_value,
      1,
      giver_id
    FROM
      chain_edges
    UNION ALL
    SELECT
      w.start_id,
      c.receiver_id,
      w.total + c.gift_value,
      w.steps + 1,
      MIN(w.low, c.giver_id)
    FROM
      walk w
      JOIN chain_edges c ON c.giver_id = w.node
    WHERE
      w.node <> w.start_id
  )
SELECT
  ROW_NUMBER() OVER (
    ORDER BY
      chain_length DESC,
      total_gift_value DESC,
      low ASC
  ) AS chain_id,
  chain_length,
  total_gift_value
FROM
  (
    SELECT
      low,
      MAX(steps) AS chain_length,
      MAX(total) AS total_gift_value
    FROM
      walk
    WHERE
      node = start_id
    GROUP BY
      low
  )
ORDER BY
  chain_id