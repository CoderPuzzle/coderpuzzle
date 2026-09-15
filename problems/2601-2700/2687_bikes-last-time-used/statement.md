# Bikes Last Time Used

## Description

Table: `Bikes`

| Column Name | Type     |
| ----------- | -------- |
| ride_id     | int      |
| bike_number | varchar  |
| start_time  | datetime |
| end_time    | datetime |

`ride_id` column contains unique values.
Each row contains a ride information that includes ride_id, bike number, start and end time of the ride.
It is guaranteed that start_time and end_time are valid datetime values.

Write a solution to find the last time when each bike was used.

Return the result table ordered by the bikes that were most recently used.

Each testcase supplies its own `dataset`: the DDL seeds the `Bikes` table
with that testcase's rows. The result format is shown in the following
example.

### Example 1

```text
Input:
Bikes table:
+---------+-------------+---------------------+---------------------+
| ride_id | bike_number | start_time          | end_time            |
+---------+-------------+---------------------+---------------------+
| 1       | W00576      | 2012-03-25 11:30:00 | 2012-03-25 12:40:00 |
| 2       | W00300      | 2012-03-25 10:30:00 | 2012-03-25 10:50:00 |
| 3       | W00455      | 2012-03-26 14:30:00 | 2012-03-26 17:40:00 |
| 4       | W00455      | 2012-03-25 12:30:00 | 2012-03-25 13:40:00 |
| 5       | W00576      | 2012-03-25 08:10:00 | 2012-03-25 09:10:00 |
| 6       | W00576      | 2012-03-28 02:30:00 | 2012-03-28 02:50:00 |
+---------+-------------+---------------------+---------------------+
Output:
+-------------+---------------------+
| bike_number | end_time            |
+-------------+---------------------+
| W00576      | 2012-03-28 02:50:00 |
| W00455      | 2012-03-26 17:40:00 |
| W00300      | 2012-03-25 10:50:00 |
+-------------+---------------------+
Explanation:
bike with number W00576 has three rides, out of that, most recent ride is with ride_id 6 which ended on 2012-03-28 02:50:00.
bike with number W00300 has only 1 ride so we will include end_time in output directly.
bike with number W00455 has two rides, out of that, most recent ride is with ride_id 3 which ended on 2012-03-26 17:40:00.
Returning output in order by the bike that were most recently used.
```

Every bike contributes exactly one row: the greatest `end_time` among its
rides, however many share that bike number. The rows then come out with the
most recently used bike first — `end_time` descending. Datetimes travel as
fixed-width `YYYY-MM-DD HH:MM:SS` text, so that descending order is both
chronological and total: every testcase is constructed so that no two
distinct bikes share a most-recent `end_time`, which makes the required
order fully determined. Write your solution as a single `SELECT` query
returning two columns — `bike_number` and `end_time`, in that order — with
the rows sorted most recent first.
