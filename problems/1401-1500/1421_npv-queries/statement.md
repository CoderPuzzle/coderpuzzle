# NPV Queries

## Description

Table: `NPV`

| Column Name | Type |
| ----------- | ---- |
| id          | int  |
| year        | int  |
| npv         | int  |

`(id, year)` is the primary key (combination of columns with unique
values) of this table. The table has information about the id and the
year of each inventory and the corresponding net present value.

Table: `Queries`

| Column Name | Type |
| ----------- | ---- |
| id          | int  |
| year        | int  |

`(id, year)` is the primary key (combination of columns with unique
values) of this table. The table has information about the id and the
year of each inventory query.

Write a solution to find the npv of each query of the `Queries` table.

Each testcase's `dataset` seeds both tables: its script inserts the
testcase's `NPV` rows and `Queries` rows before your query runs. A query
whose `(id, year)` is absent from `NPV` reports an npv of `0`. Return
the result table in any order. The result format is in the following
example.

### Example 1

```text
Input:
NPV
+------+--------+--------+
| id   | year   | npv    |
+------+--------+--------+
| 1    | 2018   | 100    |
| 7    | 2020   | 30     |
| 13   | 2019   | 40     |
| 1    | 2019   | 113    |
| 2    | 2008   | 121    |
| 3    | 2009   | 12     |
| 11   | 2020   | 99     |
| 7    | 2019   | 0      |
+------+--------+--------+
Queries
+------+--------+
| id   | year   |
+------+--------+
| 1    | 2019   |
| 2    | 2008   |
| 3    | 2009   |
| 7    | 2018   |
| 7    | 2019   |
| 7    | 2020   |
| 13   | 2019   |
+------+--------+
Output:
+------+--------+--------+
| id   | year   | npv    |
+------+--------+--------+
| 1    | 2019   | 113    |
| 2    | 2008   | 121    |
| 3    | 2009   | 12     |
| 7    | 2018   | 0      |
| 7    | 2019   | 0      |
| 7    | 2020   | 30     |
| 13   | 2019   | 40     |
+------+--------+--------+
Explanation:
The npv value of (7, 2018) is not present in the NPV table, we consider
it 0. The npv values of all other queries can be found in the NPV table.
```

Write your solution as a single `SELECT` query returning three columns —
`id`, `year`, and `npv` — one row per `Queries` row.

## Hints

### Hint 1

Every query must survive the join, matched or not — start from `Queries`
and `LEFT JOIN` `NPV` on both key columns.

### Hint 2

An unmatched row has a null `npv`; `COALESCE(n.npv, 0)` turns it into the
0 the statement asks for, while genuine zeros stored in `NPV` pass
through unchanged.
