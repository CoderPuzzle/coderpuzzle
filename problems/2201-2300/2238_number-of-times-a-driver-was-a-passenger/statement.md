# Number of Times a Driver Was a Passenger

## Description

Table: `Rides`

| Column Name  | Type |
| ------------ | ---- |
| ride_id      | int  |
| driver_id    | int  |
| passenger_id | int  |

ride_id contains unique values.
Each row of this table contains the ID of the driver and the ID of the
passenger that rode in `ride_id`.
Note that `driver_id != passenger_id`.

Write a solution to report the ID of each driver and the number of times they
were a passenger.

Return the result table in any order.

Each testcase's `dataset` seeds the `Rides` table: its script inserts the
testcase's `Rides` rows before your query runs.

The result format is in the following example.

### Example 1

```text
Input:
Rides table:
+---------+-----------+--------------+
| ride_id | driver_id | passenger_id |
+---------+-----------+--------------+
| 1       | 7         | 1            |
| 2       | 7         | 2            |
| 3       | 11        | 1            |
| 4       | 11        | 7            |
| 5       | 11        | 7            |
| 6       | 11        | 3            |
+---------+-----------+--------------+
Output:
+-----------+-----+
| driver_id | cnt |
+-----------+-----+
| 7         | 2   |
| 11        | 0   |
+-----------+-----+
Explanation:
There are two drivers in all the given rides: 7 and 11.
The driver with ID = 7 was a passenger two times.
The driver with ID = 11 was never a passenger.
```

Write your solution as a single `SELECT` query returning two columns named
`driver_id` and `cnt`, in any row order.
