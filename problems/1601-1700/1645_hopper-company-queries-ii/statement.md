# Hopper Company Queries II

## Description

Table: `Drivers`

| Column Name | Type |
| ----------- | ---- |
| driver_id   | int  |
| join_date   | date |

`driver_id` is the column with unique values for this table. Each row
records the driver's ID and the date they joined the Hopper company.

Table: `Rides`

| Column Name  | Type |
| ------------ | ---- |
| ride_id      | int  |
| user_id      | int  |
| requested_at | date |

`ride_id` is the column with unique values for this table. Each row
records a ride request's ID, the ID of the user who requested it, and
the day it was requested. Some requests in this table were never
accepted.

Table: `AcceptedRides`

| Column Name   | Type |
| ------------- | ---- |
| ride_id       | int  |
| driver_id     | int  |
| ride_distance | int  |
| ride_duration | int  |

`ride_id` is the column with unique values for this table. Each row
records details of a ride that was accepted by a driver. Every accepted
ride also has a matching row in `Rides`.

Each testcase's `dataset` seeds all three tables: its script inserts the
testcase's `Drivers`, `Rides`, and `AcceptedRides` rows (whichever are
present) before your query runs.

Write a solution to report, for each of the twelve months of 2020, the
`working_percentage` of drivers who were available that month:

```text
working_percentage = (# drivers that accepted at least one ride during the month)
                      / (# available drivers during the month) * 100.0
```

![diagram](figures/1645-1.svg)

A driver counts as **available** for a month once their `join_date`
falls on or before that month's last day of 2020, regardless of how
long ago they joined (even in an earlier year); a driver whose
`join_date` falls after that month's last day is not yet available. A
driver counts as **working** for a month when at least one of their
accepted rides has a `Rides.requested_at` date inside that month —
accepting several rides in the same month still counts that driver
once, and a ride's month is the month it was requested, regardless of
when (or whether) it was later marked accepted.

If the number of available drivers during a month is zero, that
month's `working_percentage` is `0`. Round every `working_percentage`
to the nearest 2 decimal places.

Report all twelve months of 2020 unconditionally, even months with
zero available drivers. Return the result table ordered by `month` in
ascending order, where `month` is the month's number (January is `1`,
February is `2`, and so on). The result format is in the following
example.

### Example 1

```text
Input:
Drivers
+-----------+------------+
| driver_id | join_date  |
+-----------+------------+
| 10        | 2019-12-10 |
| 8         | 2020-01-13 |
| 5         | 2020-02-16 |
| 7         | 2020-03-08 |
| 4         | 2020-05-17 |
| 1         | 2020-10-24 |
| 6         | 2021-01-05 |
+-----------+------------+
Rides
+---------+---------+--------------+
| ride_id | user_id | requested_at |
+---------+---------+--------------+
| 6       | 75      | 2019-12-09   |
| 1       | 54      | 2020-02-09   |
| 10      | 63      | 2020-03-04   |
| 19      | 39      | 2020-04-06   |
| 3       | 41      | 2020-06-03   |
| 13      | 52      | 2020-06-22   |
| 7       | 69      | 2020-07-16   |
| 17      | 70      | 2020-08-25   |
| 20      | 81      | 2020-11-02   |
| 5       | 57      | 2020-11-09   |
| 2       | 42      | 2020-12-09   |
| 11      | 68      | 2021-01-11   |
| 15      | 32      | 2021-01-17   |
| 12      | 11      | 2021-01-19   |
| 14      | 18      | 2021-01-27   |
+---------+---------+--------------+
AcceptedRides
+---------+-----------+---------------+---------------+
| ride_id | driver_id | ride_distance | ride_duration |
+---------+-----------+---------------+---------------+
| 10      | 10        | 63            | 38            |
| 13      | 10        | 73            | 96            |
| 7       | 8         | 100           | 28            |
| 17      | 7         | 119           | 68            |
| 20      | 1         | 121           | 92            |
| 5       | 7         | 42            | 101           |
| 2       | 4         | 6             | 38            |
| 11      | 8         | 37            | 43            |
| 15      | 8         | 108           | 82            |
| 12      | 8         | 38            | 34            |
| 14      | 1         | 90            | 74            |
+---------+-----------+---------------+---------------+
Output:
+-------+---------------------+
| month | working_percentage  |
+-------+---------------------+
| 1     | 0.00                |
| 2     | 0.00                |
| 3     | 25.00               |
| 4     | 0.00                |
| 5     | 0.00                |
| 6     | 20.00               |
| 7     | 20.00               |
| 8     | 20.00               |
| 9     | 0.00                |
| 10    | 0.00                |
| 11    | 33.33               |
| 12    | 16.67               |
+-------+---------------------+
Explanation:
By the end of January, two drivers were available (10, 8) and none of
them accepted a ride requested in January: 0 / 2 = 0%.
By the end of February, three drivers were available (10, 8, 5) and
none accepted a ride requested in February: 0 / 3 = 0%.
By the end of March, four drivers were available (10, 8, 5, 7) and one
of them (10) accepted a ride requested in March: 1 / 4 = 25%.
By the end of April, still four drivers were available and none
accepted a ride requested in April: 0 / 4 = 0%.
By the end of May, five drivers were available (10, 8, 5, 7, 4) and
none accepted a ride requested in May: 0 / 5 = 0%.
By the end of June, still five drivers were available and one of them
(10) accepted a ride requested in June: 1 / 5 = 20%.
By the end of July, still five drivers were available and one of them
(8) accepted a ride requested in July: 1 / 5 = 20%.
By the end of August, still five drivers were available and one of
them (7) accepted a ride requested in August: 1 / 5 = 20%.
By the end of September, still five drivers were available and none
accepted a ride requested in September: 0 / 5 = 0%.
By the end of October, six drivers were available (10, 8, 5, 7, 4, 1)
and none accepted a ride requested in October: 0 / 6 = 0%.
By the end of November, still six drivers were available and two of
them (1, 7) accepted a ride requested in November: 2 / 6 = 33.33%.
By the end of December, still six drivers were available and one of
them (4) accepted a ride requested in December: 1 / 6 = 16.67%.
Driver 6 joined in January 2021 and never counts as available for any
2020 month. The rides requested in January 2021 never count toward
any 2020 month either, whether or not they were later accepted.
```

Write your solution as a single `SELECT` query returning `month` and
`working_percentage` for every month `1` through `12`, where
`working_percentage` is `0` whenever no driver is yet available that
month, and otherwise the percentage — rounded to 2 decimal places — of
available drivers who accepted at least one ride requested during that
month. Order the result by `month` ascending.
