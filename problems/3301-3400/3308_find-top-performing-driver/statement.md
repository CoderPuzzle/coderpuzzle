# Find Top Performing Driver

## Description

Table: `Drivers`

| Column Name | Type    |
| ----------- | ------- |
| driver_id   | int     |
| name        | varchar |
| age         | int     |
| experience  | int     |
| accidents   | int     |

(`driver_id`) is the unique key for this table.
Each row includes a driver's ID, their name, age, years of driving
experience, and the number of accidents they’ve had.

Table: `Vehicles`

| Column Name | Type    |
| ----------- | ------- |
| vehicle_id  | int     |
| driver_id   | int     |
| model       | varchar |
| fuel_type   | varchar |
| mileage     | int     |

(`vehicle_id`, `driver_id`, `fuel_type`) is the unique key for this table.
Each row includes the vehicle's ID, the driver who operates it, the model,
fuel type, and mileage.

Table: `Trips`

| Column Name | Type |
| ----------- | ---- |
| trip_id     | int  |
| vehicle_id  | int  |
| distance    | int  |
| duration    | int  |
| rating      | int  |

(`trip_id`) is the unique key for this table.
Each row includes a trip's ID, the vehicle used, the distance covered (in
miles), the trip duration (in minutes), and the passenger's rating (1-5).

Uber is analyzing drivers based on their trips. Write a solution to rank
every driver within each fuel type based on the following criteria:

- A driver's performance is calculated as the average rating across all
  their trips on vehicles of that fuel type. Average rating should be
  rounded to 2 decimal places.
- If two drivers have the same average rating, the driver with the longer
  total distance traveled is ranked higher.
- If there is still a tie, the driver with the fewest accidents is ranked
  higher.

Every driver with at least one trip on a fuel type's vehicles appears in
that fuel type's standings; a driver who drove vehicles of several fuel
types is ranked within each of them separately. Return the result table
ordered by `fuel_type` in ascending order, and within each fuel type
from the highest-ranked driver to the lowest.

Each testcase supplies its own `dataset`: the script seeds the `Drivers`,
`Vehicles`, and `Trips` tables before your query runs. Only fuel types
with at least one trip appear in the result. The result format is in the
following example.

### Example 1

```text
Input:
Drivers table:
+-----------+----------+-----+------------+-----------+
| driver_id | name     | age | experience | accidents |
+-----------+----------+-----+------------+-----------+
| 1         | Alice    | 34  | 10         | 1         |
| 2         | Bob      | 45  | 20         | 3         |
| 3         | Charlie  | 28  | 5          | 0         |
+-----------+----------+-----+------------+-----------+
Vehicles table:
+------------+-----------+---------+-----------+---------+
| vehicle_id | driver_id | model   | fuel_type | mileage |
+------------+-----------+---------+-----------+---------+
| 100        | 1         | Sedan   | Gasoline  | 20000   |
| 101        | 2         | SUV     | Electric  | 30000   |
| 102        | 3         | Coupe   | Gasoline  | 15000   |
+------------+-----------+---------+-----------+---------+
Trips table:
+---------+------------+----------+----------+--------+
| trip_id | vehicle_id | distance | duration | rating |
+---------+------------+----------+----------+--------+
| 201     | 100        | 50       | 30       | 5      |
| 202     | 100        | 30       | 20       | 4      |
| 203     | 101        | 100      | 60       | 4      |
| 204     | 101        | 80       | 50       | 5      |
| 205     | 102        | 40       | 30       | 5      |
| 206     | 102        | 60       | 40       | 5      |
+---------+------------+----------+----------+--------+
Output:
+-----------+-----------+--------+----------+
| fuel_type | driver_id | rating | distance |
+-----------+-----------+--------+----------+
| Electric  | 2         | 4.50   | 180      |
| Gasoline  | 3         | 5.00   | 100      |
| Gasoline  | 1         | 4.50   | 80       |
+-----------+-----------+--------+----------+
Explanation: For fuel type Gasoline, both Alice (Driver 1) and Charlie
(Driver 3) have trips. Charlie has an average rating of 5.00 over 100
miles, while Alice has 4.50 over 80 miles, so Charlie is ranked first
and Alice second.
For fuel type Electric, Bob (Driver 2) is the only driver, with an
average rating of 4.50 over 180 miles.
The output table is ordered by fuel_type in ascending order, and within
each fuel type by the ranking criteria above.
```

Write your solution as a single `SELECT` query returning four columns —
`fuel_type`, `driver_id`, `rating`, and `distance` — one row for every
driver in each fuel type's standings under the criteria above, ordered
by `fuel_type` in ascending order and, within a fuel type, from the
highest-ranked driver to the lowest.
