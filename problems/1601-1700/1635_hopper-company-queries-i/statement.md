# Hopper Company Queries I

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

Write a solution to report, for each of the twelve months of 2020, two
statistics:

- `active_drivers` — the number of drivers who have joined Hopper by the
  end of that month. A driver counts toward a month once their
  `join_date` falls on or before the last day of that month, regardless
  of how long ago they joined (even in an earlier year); a driver whose
  `join_date` falls after that month's last day does not count yet.
- `accepted_rides` — the number of accepted rides whose `Rides.requested_at`
  falls within that month of 2020. A ride counts only when both its
  year is 2020 and its month matches; the same request month applies
  regardless of when (or whether) the ride was later marked accepted.

Report all twelve months of 2020 unconditionally, even months with zero
active drivers or zero accepted rides. Return the result table ordered
by `month` in ascending order, where `month` is the month's number
(January is `1`, February is `2`, and so on). The result format is in
the following example.

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
+-------+----------------+----------------+
| month | active_drivers | accepted_rides |
+-------+----------------+----------------+
| 1     | 2              | 0              |
| 2     | 3              | 0              |
| 3     | 4              | 1              |
| 4     | 4              | 0              |
| 5     | 5              | 0              |
| 6     | 5              | 1              |
| 7     | 5              | 1              |
| 8     | 5              | 1              |
| 9     | 5              | 0              |
| 10    | 6              | 0              |
| 11    | 6              | 2              |
| 12    | 6              | 1              |
+-------+----------------+----------------+
Explanation:
By the end of January, two drivers had joined (10, 8) and no ride
requested in January was accepted.
By the end of February, three drivers had joined (10, 8, 5) and no ride
requested in February was accepted.
By the end of March, four drivers had joined (10, 8, 5, 7) and one ride
requested in March was accepted (ride 10).
By the end of April, still four drivers had joined and no ride
requested in April was accepted.
By the end of May, five drivers had joined (10, 8, 5, 7, 4) and no ride
requested in May was accepted.
By the end of June, still five drivers had joined and one ride
requested in June was accepted (ride 13).
By the end of July, still five drivers had joined and one ride
requested in July was accepted (ride 7).
By the end of August, still five drivers had joined and one ride
requested in August was accepted (ride 17).
By the end of September, still five drivers had joined and no ride
requested in September was accepted.
By the end of October, six drivers had joined (10, 8, 5, 7, 4, 1) and no
ride requested in October was accepted.
By the end of November, still six drivers had joined and two rides
requested in November were accepted (rides 20, 5).
By the end of December, still six drivers had joined and one ride
requested in December was accepted (ride 2).
Driver 6 joined in January 2021 and never counts toward any 2020 month.
The rides requested in January 2021 (11, 15, 12, 14) never count toward
any 2020 month either, whether or not they were later accepted.
```

Write your solution as a single `SELECT` query returning `month`,
`active_drivers`, `accepted_rides` for every month `1` through `12`,
where `active_drivers` counts `Drivers` rows whose `join_date` is on or
before that month's last day of 2020, and `accepted_rides` counts
`AcceptedRides` rows whose matching `Rides.requested_at` falls in that
month of 2020. Order the result by `month` ascending.
