# Reshape Data: Pivot

## Description

DataFrame `weather`

| Column Name | Type   |
| ----------- | ------ |
| city        | object |
| month       | object |
| temperature | int    |

Write a solution to pivot the data so that each row represents temperatures for a specific month, and each city is a separate column.

The result format is in the following example.

### Example 1

```text
Input:
+--------------+----------+-------------+
| city         | month    | temperature |
+--------------+----------+-------------+
| Jacksonville | January  | 13          |
| Jacksonville | February | 23          |
| Jacksonville | March    | 38          |
| Jacksonville | April    | 5           |
| Jacksonville | May      | 34          |
| ElPaso       | January  | 20          |
| ElPaso       | February | 6           |
| ElPaso       | March    | 26          |
| ElPaso       | April    | 2           |
| ElPaso       | May      | 43          |
+--------------+----------+-------------+
Output:
+----------+--------+--------------+
| month    | ElPaso | Jacksonville |
+----------+--------+--------------+
| April    | 2      | 5            |
| February | 6      | 23           |
| January  | 20     | 13           |
| March    | 26     | 38           |
| May      | 43     | 34           |
+----------+--------+--------------+
Explanation:
The table is pivoted, each column represents a city, and each row represents a specific month.
```

Each testcase supplies its own `dataset`: the DDL seeds the `weather` table with that testcase's rows, and the city set differs from testcase to testcase, so the pivot's column list must be discovered from the seeded data. The submission is several SQLite statements: a discovery `SELECT` returning exactly one row and one column — the comma-separated pivot column expressions for the testcase's cities, in lexicographical order, each expression doing its own quoting — followed by the answer `SELECT` in which every `__COLUMNS__` placeholder is replaced by that discovered list before execution. Column names are judged: `month` comes first and the city columns follow in lexicographical order, with null in a cell whose (month, city) reading is absent from the seed. Rows compare in lexicographical `month` order, the order the example shows.

## Hints

### Hint 1

Consider using a built-in function in pandas library to transform the data
