# Flight Occupancy and Waitlist Analysis

## Description

Table: `Flights`

| Column Name | Type |
| ----------- | ---- |
| flight_id   | int  |
| capacity    | int  |

flight_id is the column with unique values for this table.
Each row of this table contains flight id and its capacity.

Table: `Passengers`

| Column Name  | Type |
| ------------ | ---- |
| passenger_id | int  |
| flight_id    | int  |

passenger_id is the column with unique values for this table.
Each row of this table contains passenger id and flight id.

Passengers book tickets for flights in advance.
If a passenger books a ticket for a flight and there are still empty seats available on the flight, the passenger ticket will be confirmed. However, the passenger will be on a waitlist if the flight is already at full capacity.

Write a solution to report the number of passengers who successfully booked a flight (got a seat) and the number of passengers who are on the waitlist for each flight.

Return the result table ordered by flight_id in ascending order.

Each testcase supplies its own `dataset`, whose statements insert rows
into `Flights` and `Passengers` before the query runs. Every passenger
books a flight that appears in `Flights`; a flight may have no
passengers at all and still must be reported — with 0 booked and 0
waitlisted. Capacity zero seats nobody, so every passenger of such a
flight is waitlisted. A flight whose passenger count equals its
capacity is fully occupied with an empty waitlist, and only the
passengers beyond capacity go to the waitlist.
The result format is in the following example.

### Example 1

```text
Input:
Flights table:
+-----------+----------+
| flight_id | capacity |
+-----------+----------+
| 1         | 2        |
| 2         | 2        |
| 3         | 1        |
+-----------+----------+
Passengers table:
+--------------+-----------+
| passenger_id | flight_id |
+--------------+-----------+
| 101          | 1         |
| 102          | 1         |
| 103          | 1         |
| 104          | 2         |
| 105          | 2         |
| 106          | 3         |
| 107          | 3         |
+--------------+-----------+
Output:
+-----------+------------+--------------+
| flight_id | booked_cnt | waitlist_cnt |
+-----------+------------+--------------+
| 1         | 2          | 1            |
| 2         | 2          | 0            |
| 3         | 1          | 1            |
+-----------+------------+--------------+
Explanation:
- Flight 1 has a capacity of 2. As there are 3 passengers who have booked tickets, only 2 passengers can get a seat. Therefore, 2 passengers are successfully booked, and 1 passenger is on the waitlist.
- Flight 2 has a capacity of 2. Since there are exactly 2 passengers who booked tickets, everyone can secure a seat. As a result, 2 passengers successfully booked their seats and there are no passengers on the waitlist.
- Flight 3 has a capacity of 1. As there are 2 passengers who have booked tickets, only 1 passenger can get a seat. Therefore, 1 passenger is successfully booked, and 1 passenger is on the waitlist.
```

Write your solution as a single `SELECT` query returning `flight_id`,
`booked_cnt`, and `waitlist_cnt` for every flight, ordered ascending by
`flight_id` — the ordering is judged.

## Hints

### Hint 1

Count passengers per flight first — GROUP BY flight_id over Passengers with COUNT(*) — then attach each tally to its flight with a LEFT JOIN driven by Flights. An INNER JOIN silently drops every zero-passenger flight, which must still be reported as 0 booked and 0 waitlisted.

### Hint 2

The missed join leaves the count NULL: COALESCE(cnt, 0) turns it into 0 before anything else touches it. Then booked = MIN(cnt, capacity) and waitlist = MAX(cnt - capacity, 0) — SQLite's two-argument scalar min/max — handle both boundaries at once: under capacity everyone books, at exactly capacity the waitlist lands on 0 rather than going negative, beyond capacity the overflow waits.

### Hint 3

ORDER BY flight_id ASC supplies the required ascending order; the judge compares rows exactly, so a dataset whose flights are inserted out of order still expects the output sorted by flight_id.
