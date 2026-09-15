# Calculate Compressed Mean

## Description

Table: `Orders`

| Column Name       | Type |
| ----------------- | ---- |
| order_id          | int  |
| item_count        | int  |
| order_occurrences | int  |

`order_id` is column of unique values for this table. This table contains
order_id, item_count, and order_occurrences.

Write a solution to calculate the average number of items per order, rounded
to 2 decimal places.

Return the result table in any order.

Each testcase supplies its own `dataset`: the DDL seeds the `Orders` table
with that testcase's rows. The result format is in the following example.

### Example 1

```text
Input:
Orders table:
+----------+------------+-------------------+
| order_id | item_count | order_occurrences |
+----------+------------+-------------------+
| 10       | 1          | 500               |
| 11       | 2          | 1000              |
| 12       | 3          | 800               |
| 13       | 4          | 1000              |
+----------+------------+-------------------+
Output
+-------------------------+
| average_items_per_order |
+-------------------------+
| 2.70                    |
+-------------------------+
Explanation
The calculation is as follows:
 - Total items: (1 * 500) + (2 * 1000) + (3 * 800) + (4 * 1000) = 8900
 - Total orders: 500 + 1000 + 800 + 1000 = 3300
 - Therefore, the average items per order is 8900 / 3300 = 2.70
```

The data is compressed: a row with `item_count` `c` and `order_occurrences`
`k` stands for `k` orders that each contain `c` items, as the example's
arithmetic shows — the mean divides the weighted total
`SUM(item_count * order_occurrences)` by the order total
`SUM(order_occurrences)`, then rounds to 2 decimal places. The aggregate
always emits exactly one row: the mean for a non-empty table, and `null`
when the dataset seeds no rows. Write your solution as a single `SELECT`
query returning one row with one column: `average_items_per_order`.
