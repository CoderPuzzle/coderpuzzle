# Pizza Toppings Cost Analysis

## Description

Table: `Toppings`

| Column Name  | Type    |
| ------------ | ------- |
| topping_name | varchar |
| cost         | decimal |

`topping_name` is the primary key for this table.
Each row of this table contains topping name and the cost of the topping.

Write a solution to calculate the total cost of all possible 3-topping
pizza combinations from a given list of toppings. The total cost of
toppings must be rounded to 2 decimal places.

Note:

- Do not include the pizzas where a topping is repeated. For example,
  'Pepperoni, Pepperoni, Onion Pizza'.
- Toppings must be listed in alphabetical order. For example, 'Chicken,
  Onions, Sausage'. 'Onion, Sausage, Chicken' is not acceptable.

Return the result table ordered by total cost in descending order and
combination of toppings in ascending order.

Each testcase supplies its own `dataset`: the DDL seeds the `Toppings`
table with that testcase's rows. The result format is in the following
example.

### Example 1

```text
Input:
Toppings table:
+--------------+------+
| topping_name | cost |
+--------------+------+
| Pepperoni    | 0.50 |
| Sausage      | 0.70 |
| Chicken      | 0.55 |
| Extra Cheese | 0.40 |
+--------------+------+
Output:
+--------------------------------+------------+
| pizza                          | total_cost |
+--------------------------------+------------+
| Chicken,Pepperoni,Sausage      | 1.75       |
| Chicken,Extra Cheese,Sausage   | 1.65       |
| Extra Cheese,Pepperoni,Sausage | 1.60       |
| Chicken,Extra Cheese,Pepperoni | 1.45       |
+--------------------------------+------------+
Explanation:
There are only four different combinations possible with the three topings:
- Chicken, Pepperoni, Sausage: Total cost is $1.75 (Chicken $0.55, Pepperoni $0.50, Sausage $0.70).
- Chicken, Extra Cheese, Sausage: Total cost is $1.65 (Chicken $0.55, Extra Cheese $0.40, Sausage $0.70).
- Extra Cheese, Pepperoni, Sausage: Total cost is $1.60 (Extra Cheese $0.40, Pepperoni $0.50, Sausage $0.70).
- Chicken, Extra Cheese, Pepperoni: Total cost is $1.45 (Chicken $0.55, Extra Cheese $0.40, Pepperoni $0.50).
Output table is ordered by the total cost in descending order.
```

Write your solution as a single `SELECT` query returning two columns —
`pizza`, the three chosen topping names joined with `,` (a comma with no
spaces, exactly as the example's output shows) listed alphabetically,
and `total_cost`, their combined price rounded to 2 decimal places —
with one row for every combination of three distinct toppings.
Alphabetical order means SQLite's default binary comparison of the
stored names, so an uppercase letter sorts before a lowercase one.
Return the result table ordered by `total_cost` descending and then
`pizza` ascending.
