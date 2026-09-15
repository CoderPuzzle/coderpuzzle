SELECT
  group_concat(
    quote(name) || ', "' || replace(name, '"', '""') || '"',
    ','
  )
FROM
  pragma_table_info ('Products')
WHERE
  name <> 'product_id';

SELECT
  product_id,
  json_each.key AS store,
  json_each.value AS price
FROM
  Products,
  json_each(json_object(__COLUMNS__))
WHERE
  json_each.value IS NOT NULL
ORDER BY
  product_id,
  json_each.key