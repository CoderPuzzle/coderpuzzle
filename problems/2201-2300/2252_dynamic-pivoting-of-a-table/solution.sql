SELECT
  group_concat(
    'max(CASE WHEN store = ' || quote(store) || ' THEN price END) AS "' || replace(store, '"', '""') || '"',
    ','
    ORDER BY
      store
  )
FROM
  (
    SELECT DISTINCT
      store
    FROM
      Products
  );

SELECT
  product_id,
  __COLUMNS__
FROM
  Products
GROUP BY
  product_id
ORDER BY
  product_id