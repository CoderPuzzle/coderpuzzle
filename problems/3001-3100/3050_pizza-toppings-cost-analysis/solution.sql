SELECT
  a.topping_name || ',' || b.topping_name || ',' || c.topping_name AS pizza,
  ROUND(a.cost + b.cost + c.cost, 2) AS total_cost
FROM
  Toppings a,
  Toppings b,
  Toppings c
WHERE
  b.topping_name > a.topping_name
  AND c.topping_name > b.topping_name
ORDER BY
  total_cost DESC,
  pizza ASC