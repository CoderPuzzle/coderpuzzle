WITH RECURSIVE
  expected (task_id, subtask_id) AS (
    SELECT
      task_id,
      1
    FROM
      Tasks
    UNION ALL
    SELECT
      e.task_id,
      e.subtask_id + 1
    FROM
      expected e
      JOIN Tasks t ON t.task_id = e.task_id
    WHERE
      e.subtask_id < t.subtasks_count
  )
SELECT
  e.task_id AS task_id,
  e.subtask_id AS subtask_id
FROM
  expected e
  LEFT JOIN Executed x ON x.task_id = e.task_id
  AND x.subtask_id = e.subtask_id
WHERE
  x.task_id IS NULL
ORDER BY
  e.task_id,
  e.subtask_id