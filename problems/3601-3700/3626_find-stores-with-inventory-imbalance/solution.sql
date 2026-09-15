WITH
  ranked AS (
    SELECT
      store_id,
      product_name,
      quantity,
      price,
      ROW_NUMBER() OVER (
        PARTITION BY
          store_id
        ORDER BY
          price DESC,
          inventory_id
      ) AS exp_rank,
      ROW_NUMBER() OVER (
        PARTITION BY
          store_id
        ORDER BY
          price ASC,
          inventory_id
      ) AS cheap_rank,
      COUNT(*) OVER (
        PARTITION BY
          store_id
      ) AS product_count
    FROM
      inventory
  )
SELECT
  st.store_id,
  st.store_name,
  st.location,
  e.product_name AS most_exp_product,
  c.product_name AS cheapest_product,
  ROUND(c.quantity * 1.0 / e.quantity, 2) AS imbalance_ratio
FROM
  stores st
  JOIN ranked e ON e.store_id = st.store_id
  AND e.exp_rank = 1
  JOIN ranked c ON c.store_id = st.store_id
  AND c.cheap_rank = 1
WHERE
  e.quantity < c.quantity
  AND e.product_count >= 3
ORDER BY
  imbalance_ratio DESC,
  st.store_name ASC