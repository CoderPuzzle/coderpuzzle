# Hopper Company Queries III

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
present) before your query runs. `Drivers` shares this schema with the
rest of the Hopper series but is not needed to answer this query.

Write a solution to compute `average_ride_distance` and
`average_ride_duration` for every 3-month window of 2020 that starts
in January and ends by December: January-March, February-April,
March-May, ..., October-December — ten windows in total, one per
starting month `1` through `10`.

For a window starting at month `s`, first find, for each of the three
months `s`, `s + 1`, `s + 2`, the sum of `ride_distance` (respectively
`ride_duration`) over every `AcceptedRides` row whose matching
`Rides.requested_at` falls inside that month of **2020** — a month with
no such accepted ride contributes `0` for that month, and a ride whose
`requested_at` falls outside 2020 (an earlier or later year) never
contributes to any window, regardless of whether it was accepted.
`average_ride_distance` is then the sum of those three monthly totals
divided by `3`; `average_ride_duration` is computed the same way from
the duration totals. Round both averages to the nearest two decimal
places.

Return the result table ordered by `month` in ascending order, where
`month` is the window's starting month number (January is `1`,
February is `2`, and so on, through `10` for the October-December
window). The result format is in the following example.

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
+-------+------------------------+------------------------+
| month | average_ride_distance  | average_ride_duration  |
+-------+------------------------+------------------------+
| 1     | 21.00                  | 12.67                  |
| 2     | 21.00                  | 12.67                  |
| 3     | 21.00                  | 12.67                  |
| 4     | 24.33                  | 32.00                  |
| 5     | 57.67                  | 41.33                  |
| 6     | 97.33                  | 64.00                  |
| 7     | 73.00                  | 32.00                  |
| 8     | 39.67                  | 22.67                  |
| 9     | 54.33                  | 64.33                  |
| 10    | 56.33                  | 77.00                  |
+-------+------------------------+------------------------+
Explanation:
The accepted rides fall into these 2020 months by their Rides.requested_at
date: March (ride 10, distance 63, duration 38), June (ride 13, distance
73, duration 96), July (ride 7, distance 100, duration 28), August (ride
17, distance 119, duration 68), November (rides 20 and 5, distances 121
and 42, durations 92 and 101, totalling distance 163 and duration 193),
and December (ride 2, distance 6, duration 38). Rides 11, 15, 12, and 14
were requested in January 2021 and never count toward any window, whether
or not they were accepted; ride 6 was requested in December 2019 and is
also outside 2020 (it additionally was never accepted).
The January window covers January, February, March: distances
(0, 0, 63) average to 63 / 3 = 21.00; durations (0, 0, 38) average to
38 / 3 = 12.67.
The February window covers February, March, April: distances
(0, 63, 0) average to 21.00; durations (0, 38, 0) average to 12.67.
The March window covers March, April, May: distances (63, 0, 0) average
to 21.00; durations (38, 0, 0) average to 12.67.
The April window covers April, May, June: distances (0, 0, 73) average
to 73 / 3 = 24.33; durations (0, 0, 96) average to 32.00.
The May window covers May, June, July: distances (0, 73, 100) average to
173 / 3 = 57.67; durations (0, 96, 28) average to 124 / 3 = 41.33.
The June window covers June, July, August: distances (73, 100, 119)
average to 292 / 3 = 97.33; durations (96, 28, 68) average to 192 / 3 =
64.00.
The July window covers July, August, September: distances (100, 119, 0)
average to 219 / 3 = 73.00; durations (28, 68, 0) average to 32.00.
The August window covers August, September, October: distances
(119, 0, 0) average to 39.67; durations (68, 0, 0) average to 22.67.
The September window covers September, October, November: distances
(0, 0, 163) average to 54.33; durations (0, 0, 193) average to 64.33.
The October window covers October, November, December: distances
(0, 163, 6) average to 169 / 3 = 56.33; durations (0, 193, 38) average
to 231 / 3 = 77.00.
```

Write your solution as a single `SELECT` query returning `month`,
`average_ride_distance`, `average_ride_duration` for every starting
month `1` through `10`, where each window's averages are computed from
the sum of `AcceptedRides.ride_distance` (respectively
`ride_duration`) across its three months of 2020, divided by `3` and
rounded to two decimal places — a month with no accepted rides
contributes `0` to that window's sum, and rides outside 2020 never
contribute. Order the result by `month` ascending.
