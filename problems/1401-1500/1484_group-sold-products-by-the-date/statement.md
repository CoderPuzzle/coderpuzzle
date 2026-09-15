# Group Sold Products By The Date

## Description

Table `Activities`:

| Column Name | Type    |
| ----------- | ------- |
| sell_date   | date    |
| product     | varchar |

There is no primary key (column with unique values) for this table. It
may contain duplicates. Each row of this table contains the product name
and the date it was sold in a market.

For each date, find the number of different products sold and their names.
The sold products' names for each date should be sorted lexicographically,
separated by a comma.

Return the result table ordered by `sell_date`.

Each testcase's `dataset` seeds the table: its script inserts the
testcase's `Activities` rows before your query runs. The result format is
in the following example.

### Example 1

```text
Input:
Activities table:
+------------+------------+
| sell_date  | product    |
+------------+------------+
| 2020-05-30 | Headphone  |
| 2020-06-01 | Pencil     |
| 2020-06-02 | Mask       |
| 2020-05-30 | Basketball |
| 2020-06-01 | Bible      |
| 2020-06-02 | Mask       |
| 2020-05-30 | T-Shirt    |
+------------+------------+
Output:
+------------+----------+------------------------------+
| sell_date  | num_sold | products                     |
+------------+----------+------------------------------+
| 2020-05-30 | 3        | Basketball,Headphone,T-Shirt |
| 2020-06-01 | 2        | Bible,Pencil                 |
| 2020-06-02 | 1        | Mask                         |
+------------+----------+------------------------------+
Explanation:
For 2020-05-30, the sold items were (Headphone, Basketball, T-Shirt);
sorted lexicographically they are separated by a comma. For 2020-06-01,
the sold items were (Pencil, Bible). For 2020-06-02, the sold item is
(Mask), so it is returned alone.
```

## Hints

### Hint 1

`GROUP BY sell_date` reduces each date to a single output row; `COUNT`
and `GROUP_CONCAT` over the distinct products finish the job.
