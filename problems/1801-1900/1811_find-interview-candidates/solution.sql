SELECT
  name,
  mail
FROM
  Users
WHERE
  user_id IN (
    SELECT
      user_id
    FROM
      (
        SELECT
          user_id,
          contest_id - ROW_NUMBER() OVER (
            PARTITION BY
              user_id
            ORDER BY
              contest_id
          ) AS grp
        FROM
          (
            SELECT
              contest_id,
              gold_medal AS user_id
            FROM
              Contests
            UNION
            SELECT
              contest_id,
              silver_medal
            FROM
              Contests
            UNION
            SELECT
              contest_id,
              bronze_medal
            FROM
              Contests
          )
      )
    GROUP BY
      user_id,
      grp
    HAVING
      COUNT(*) >= 3
  )
  OR user_id IN (
    SELECT
      gold_medal
    FROM
      Contests
    GROUP BY
      gold_medal
    HAVING
      COUNT(DISTINCT contest_id) >= 3
  )