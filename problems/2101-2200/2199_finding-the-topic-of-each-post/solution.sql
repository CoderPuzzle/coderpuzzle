SELECT
  p.post_id,
  COALESCE(
    (
      SELECT
        GROUP_CONCAT(
          k.topic_id,
          ','
          ORDER BY
            k.topic_id
        )
      FROM
        (
          SELECT DISTINCT
            kw.topic_id AS topic_id
          FROM
            Keywords kw
          WHERE
            instr(
              ' ' || lower(p.content) || ' ',
              ' ' || lower(kw.word) || ' '
            ) > 0
        ) k
    ),
    'Ambiguous!'
  ) AS topic
FROM
  Posts p