# Reshape Data: Melt

## Description

DataFrame `report`:

| Column Name  | Type   |
| ------------ | ------ |
| row_position | int    |
| product      | object |
| quarter_1    | int    |
| quarter_2    | int    |
| quarter_3    | int    |
| quarter_4    | int    |

row_position is the primary key for this table.
Each row of this table holds one product's quarterly sales: the product
name and its sales in each of the four quarters, together with that
row's 1-based position in the DataFrame.

Write a solution to reshape the data so that each row represents sales
data for a product in a specific quarter.

Each testcase supplies its own `dataset`: the script seeds the `report`
table with that testcase's rows before your query runs. In every dataset
the `row_position` values run `1, 2, ..., n` in the DataFrame's row
order, and the DataFrame's row order is its ascending `row_position`
order. Rows may be listed in any order inside the dataset's INSERT
statements, so a correct query cannot assume the scan order of the table
matches its frame order.

The result format is in the following example.

### Example 1

```text
Input:
report table:
+--------------+-------------+-----------+-----------+-----------+-----------+
| row_position | product     | quarter_1 | quarter_2 | quarter_3 | quarter_4 |
+--------------+-------------+-----------+-----------+-----------+-----------+
| 1            | Umbrella    | 417       | 224       | 379       | 611       |
| 2            | SleepingBag | 800       | 936       | 93        | 875       |
+--------------+-------------+-----------+-----------+-----------+-----------+
Output:
+-------------+-----------+-------+
| product     | quarter   | sales |
+-------------+-----------+-------+
| Umbrella    | quarter_1 | 417   |
| SleepingBag | quarter_1 | 800   |
| Umbrella    | quarter_2 | 224   |
| SleepingBag | quarter_2 | 936   |
| Umbrella    | quarter_3 | 379   |
| SleepingBag | quarter_3 | 93    |
| Umbrella    | quarter_4 | 611   |
| SleepingBag | quarter_4 | 875   |
+-------------+-----------+-------+
Explanation:
The DataFrame is reshaped from wide to long format. Each row represents the sales of a product in a quarter.
```

Write your solution as a single `SELECT` query returning exactly three
columns, `product` then `quarter` then `sales`: one block per quarter in
`quarter_1`, `quarter_2`, `quarter_3`, `quarter_4` order, each block
listing every product row in ascending `row_position` order with that
product's sales in that quarter — the wide DataFrame melted to long
format.

## Hints

### Hint 1

Consider using a built-in function in pandas library to transform the
data. In SQL the counterpart of melting is a `UNION ALL` over the four
quarter columns — each branch labels its rows with that quarter's name
and projects its values as `sales` — followed by one `ORDER BY` that
restores the quarter-major, frame-order layout of the melted frame.
