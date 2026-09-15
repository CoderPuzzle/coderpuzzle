# Countries You Can Safely Invest In

## Description

Table: `Person`

| Column Name  | Type    |
| ------------ | ------- |
| id           | int     |
| name         | varchar |
| phone_number | varchar |

`id` is the primary key (column with unique values) for this table. Each
row of this table contains the name of a person and their phone number.
The phone number has the form `'xxx-yyyyyyy'`, where `xxx` is the
three-digit country code and `yyyyyyy` is the seven-digit local number;
both parts may contain leading zeros.

Table: `Country`

| Column Name  | Type    |
| ------------ | ------- |
| name         | varchar |
| country_code | varchar |

`country_code` is the primary key (column with unique values) for this
table. Each row of this table contains a country's name and its
three-digit code (digits only, possibly with leading zeros).

Table: `Calls`

| Column Name | Type |
| ----------- | ---- |
| caller_id   | int  |
| callee_id   | int  |
| duration    | int  |

This table may contain duplicate rows. Each row of this table records a
call's caller id, callee id, and duration in minutes. `caller_id` is
never equal to `callee_id`.

A telecommunications company wants to invest in new countries: those
where the average duration of calls placed in that country is strictly
greater than the average duration of every call in the whole system. A
call is placed in a country if either the caller or the callee has a
phone number whose country code belongs to that country, and a call
between two people of the same country counts toward that country's
average from both ends.

Write a solution to find the countries where the company can safely
invest.

Return the result table in any order.

Each testcase supplies its own `dataset`: the DDL seeds `Person`,
`Country`, and `Calls` with that testcase's rows before your query runs.
The result format is in the following example.

### Example 1

```text
Input: Person, Country, and Calls tables from the dataset below.
Output:
country
Peru
Explanation: The average call duration for Peru is
(102 + 102 + 330 + 330 + 5 + 5) / 6 = 145.666667. The average call
duration for Israel is
(33 + 4 + 13 + 13 + 3 + 1 + 1 + 7) / 8 = 9.375000. The average call
duration for Morocco is (33 + 4 + 59 + 59 + 3 + 7) / 6 = 27.500000. The
global average call duration is
(2 * (33 + 4 + 59 + 102 + 330 + 5 + 13 + 3 + 1 + 7)) / 20 = 55.700000.
Peru is the only country whose average strictly exceeds the global
average, so it is the only recommended country.
```

Write your solution as a single `SELECT` query returning one column —
`country` — one row for every country whose average call duration
strictly exceeds the global average call duration.
