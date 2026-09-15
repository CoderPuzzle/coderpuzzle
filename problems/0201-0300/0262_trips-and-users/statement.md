# Trips and Users

## Description

The `Trips` table holds all taxi trips. Each trip has a unique `id`,
while `client_id` and `driver_id` are foreign keys to the `users_id` column
of the `Users` table.

Trips

| Column Name | Type    |
| ----------- | ------- |
| id          | int     |
| client_id   | int     |
| driver_id   | int     |
| city_id     | int     |
| status      | enum    |
| request_at  | varchar |

`id` is the primary key. `status` is one of `('completed',
'cancelled_by_driver', 'cancelled_by_client')`.

Users

| Column Name | Type |
| ----------- | ---- |
| users_id    | int  |
| banned      | enum |
| role        | enum |

`users_id` is the primary key. `banned` is one of `('Yes', 'No')` and
`role` is one of `('client', 'driver', 'partner')`.

The **cancellation rate** is computed by dividing the number of canceled
(by client or driver) requests with unbanned users by the total number of
requests with unbanned users on that day.

Write a solution to find the cancellation rate of requests with unbanned
users (both client and driver must not be banned) each day between
`2013-10-01` and `2013-10-03` with at least one trip. Round the
cancellation rate to two decimal places. Note: SQLite's `ROUND` returns a
number, so `0.00` and `0` compare equal here.

The test cases use the schema above with different datasets; each testcase's
`dataset` value contains the `INSERT` statements to seed it.

### Example 1

```text
Input: the Trips and Users tables from the dataset below.
Output:
Day        | Cancellation Rate
2013-10-01 | 0.33
2013-10-02 | 0.00
2013-10-03 | 0.50
```

Write your solution as a single `SELECT` query returning columns `Day` and
`Cancellation Rate`.

## Hints

### Hint 1

Join Trips to Users twice — once for the client, once for the driver — and keep only rows where both are unbanned.

### Hint 2

Group by day and divide cancelled trips by total trips; CASE WHEN turns the status into a 0/1 counter.

### Hint 3

ROUND(x, 2) formats the rate; days outside 2013-10-01..2013-10-03 are filtered before grouping.
