SELECT
  ROUND(
    SUM(item_count * order_occurrences) * 1.0 / SUM(order_occurrences),
    2
  ) AS average_items_per_order
FROM
  Orders