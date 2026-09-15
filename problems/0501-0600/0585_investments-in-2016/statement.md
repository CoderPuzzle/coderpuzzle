# Investments in 2016

## Description

Table: `Insurance`

| Column Name | Type  |
| ----------- | ----- |
| pid         | int   |
| tiv_2015    | float |
| tiv_2016    | float |
| lat         | float |
| lon         | float |

`pid` is the primary key (column with unique values) for this table.
Each row of this table contains the insurance information of one policy
where pid is the policyholder's policy ID, tiv_2015 is the total
investment value in 2015 and tiv_2016 is the total investment value in
2016, and lat is the latitude and lon is the longitude of the policy
holder's city. It is guaranteed that lat and lon are not NULL.

Write a solution to report the sum of all total investment values in 2016
`tiv_2016` for all policyholders who:

- have the same `tiv_2015` value as one or more other policyholders, and
- are not located in the same city as any other policyholder (i.e., the
  `(lat, lon)` attribute pairs must be unique).

Round `tiv_2016` to two decimal places.

Each testcase supplies its own `dataset`: its script inserts the
testcase's `Insurance` rows before your query runs. The result format is
in the following example.

### Example 1

```text
Input: Insurance table from the dataset below.
Output:
tiv_2016
45.00
Explanation: the first record, like the last, meets both of the two
criteria — its tiv_2015 value 10 is the same as the third and fourth
records', and its location is unique. The second record does not meet
either criterion: no other policyholder has its tiv_2015, and its
location is the same as the third record's, which makes the third record
fail too. So the result is the sum of tiv_2016 of the first and last
records, 5 + 40 = 45.
```

Write your solution as a single `SELECT` query returning one column —
`tiv_2016`, the total 2016 investment value summed over the qualifying
policyholders and rounded to two decimal places — as a single row.

## Hints

### Hint 1

Both conditions are properties of the whole table, not of any one row, so each becomes a grouped set: GROUP BY tiv_2015 with HAVING COUNT(_) > 1 names the 2015 values that two or more policyholders share, and GROUP BY lat, lon with HAVING COUNT(_) = 1 names the location pairs that belong to exactly one policyholder. Group the location as a pair — lat is only half a city, and two policyholders at the same latitude but different longitudes are still in different cities.

### Hint 2

Both sets become membership filters on the surviving rows: a policyholder counts when its tiv_2015 is one of the shared values AND its (lat, lon) is one of the unique pairs. SQLite compares row values as a unit — tiv_2015 IN (SELECT ...) and (lat, lon) IN (SELECT lat, lon FROM ...) — or the two grouped sets can be built as CTEs and inner-joined onto Insurance; either way each grouped set holds one row per value or pair, so every policyholder matches at most once and no row is double-counted in the sum.

### Hint 3

The answer is one aggregate over the survivors: ROUND(SUM(tiv_2016), 2). SUM adds the REAL column of the filtered rows and ROUND takes it to two decimals with ties going away from zero on the stored binary value — a sum of exactly 45.125 comes back 45.13, while a decimal 2.675 is stored just below the half and stays 2.67. When no policyholder qualifies the aggregate still emits its single row: the sum of no rows is null.
