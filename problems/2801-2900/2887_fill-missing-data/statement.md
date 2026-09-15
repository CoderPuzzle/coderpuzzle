# Fill Missing Data

## Description

Table: `products`

| Column Name  | Type   |
| ------------ | ------ |
| row_position | int    |
| name         | object |
| quantity     | int    |
| price        | int    |

row_position is the primary key for this table.

The frame this problem transforms is a pandas `products` DataFrame with the
three data columns `name` (object), `quantity` (int), and `price` (int),
read in a fixed row order. Each row of the `products` table holds one row
of that frame — its name, quantity, and price — together with the row's
1-based position in the frame, so the frame's row order survives the
seeding.

Some rows are missing their value in the quantity column.

Write a solution to fill in the missing value as 0 in the quantity column.

Each testcase supplies its own `dataset`: the script seeds the `products`
table with that testcase's DataFrame rows before your query runs, storing
a row's missing quantity as SQL `NULL`. The result format is in the
following example.

### Example 1

```text
Input:
+--------------+-----------------+----------+-------+
| row_position | name            | quantity | price |
+--------------+-----------------+----------+-------+
| 1            | Wristwatch      | None     | 135   |
| 2            | WirelessEarbuds | None     | 821   |
| 3            | GolfClubs       | 779      | 9319  |
| 4            | Printer         | 849      | 3051  |
+--------------+-----------------+----------+-------+
Output:
+-----------------+----------+-------+
| name            | quantity | price |
+-----------------+----------+-------+
| Wristwatch      | 0        | 135   |
| WirelessEarbuds | 0        | 821   |
| GolfClubs       | 779      | 9319  |
| Printer         | 849      | 3051  |
+-----------------+----------+-------+
Explanation:
The quantity for Wristwatch and WirelessEarbuds are filled by 0.
```

Write your solution as a single `SELECT` query returning exactly three
columns, `name` then `quantity` then `price`, one row per frame row in the
frame's original row order. The `quantity` output column carries the
filled values: every missing quantity is replaced by `0`, and a stored
quantity — even a stored `0` — passes through unchanged.

## Hints

### Hint 1

Consider using a build-in function in pandas library to fill the missing
values of specified columns. In SQL the counterpart is `COALESCE`:
`COALESCE(quantity, 0)` yields the stored quantity when it is present and
`0` when it is `NULL`, and `ORDER BY row_position` restores the frame's
original row order.
