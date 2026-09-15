WITH
  requests AS (
    SELECT
      COUNT(*) AS n
    FROM
      (
        SELECT DISTINCT
          sender_id,
          send_to_id
        FROM
          FriendRequest
      )
  ),
  accepts AS (
    SELECT
      COUNT(*) AS n
    FROM
      (
        SELECT DISTINCT
          requester_id,
          accepter_id
        FROM
          RequestAccepted
      )
  )
SELECT
  ROUND(
    COALESCE(accepts.n * 1.0 / NULLIF(requests.n, 0), 0),
    2
  ) AS accept_rate
FROM
  requests
  CROSS JOIN accepts