SELECT DISTINCT
  c.title
FROM
  Content c
  JOIN TVProgram p ON c.content_id = p.content_id
WHERE
  c.Kids_content = 'Y'
  AND c.content_type = 'Movies'
  AND STRFTIME('%Y-%m', p.program_date) = '2020-06'