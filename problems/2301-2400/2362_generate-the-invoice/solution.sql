WITH
  priced AS (
    SELECT
      p.invoice_id,
      p.product_id,
      p.quantity,
      pr.price * p.quantity AS line_price
    FROM
      Purchases p
      JOIN Products pr ON pr.product_id = p.product_id
  ),
  totals AS (
    SELECT
      invoice_id,
      RANK() OVER (
        ORDER BY
          SUM(line_price) DESC,
          invoice_id ASC
      ) AS rnk
    FROM
      priced
    GROUP BY
      invoice_id
  )
SELECT
  priced.product_id,
  priced.quantity,
  priced.line_price AS price
FROM
  priced
  JOIN totals ON totals.invoice_id = priced.invoice_id
WHERE
  totals.rnk = 1