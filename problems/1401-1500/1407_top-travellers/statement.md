# Top Travellers

## Description

Table: `Users`

| Column Name | Type    |
| ----------- | ------- |
| id          | int     |
| name        | varchar |

`id` is the column with unique values for this table. `name` is the name
of the user.

Table: `Rides`

| Column Name | Type |
| ----------- | ---- |
| id          | int  |
| user_id     | int  |
| distance    | int  |

`id` is the column with unique values for this table. `user_id` is the id
of the user who traveled the distance `distance`.

Write a solution to report the distance traveled by each user.

Each testcase's `dataset` seeds both tables: its script inserts the
testcase's `Users` rows and, when present, its `Rides` rows before your
query runs. Return the result table ordered by `travelled_distance` in
descending order; if two or more users traveled the same distance, order
them by their `name` in ascending order. The result format is in the
following example.

### Example 1

```text
Input:
Users
+------+-----------+
| id   | name      |
+------+-----------+
| 1    | Alice     |
| 2    | Bob       |
| 3    | Alex      |
| 4    | Donald    |
| 7    | Lee       |
| 13   | Jonathan  |
| 19   | Elvis     |
+------+-----------+
Rides
+------+----------+----------+
| id   | user_id  | distance |
+------+----------+----------+
| 1    | 1        | 120      |
| 2    | 2        | 317      |
| 3    | 3        | 222      |
| 4    | 7        | 100      |
| 5    | 13       | 312      |
| 6    | 19       | 50       |
| 7    | 7        | 120      |
| 8    | 19       | 400      |
| 9    | 7        | 230      |
+------+----------+----------+
Output:
+----------+--------------------+
| name     | travelled_distance |
+----------+--------------------+
| Elvis    | 450                |
| Lee      | 450                |
| Bob      | 317                |
| Jonathan | 312                |
| Alex     | 222                |
| Alice    | 120                |
| Donald   | 0                  |
+----------+--------------------+
Explanation: Elvis and Lee traveled 450 miles, Elvis is the top traveler
as his name is alphabetically smaller than Lee. Bob, Jonathan, Alex, and
Alice have only one ride and we just order them by the total distances of
the ride. Donald did not have any rides, the distance traveled by him is
0.
```

Write your solution as a single `SELECT` query returning two columns —
`name` and `travelled_distance` — one row per user.

## Hints

### Hint 1

Every user must appear in the answer, even a user with no rides — that
user's travelled distance is 0, so start from `Users` and `LEFT JOIN`
the rides in.

### Hint 2

Group by user and sum the distances of that user's rides: `SUM` over the
joined rides gives the travelled distance, and a user with no matching
ride yields a null sum that must be turned into 0 with `COALESCE`.

### Hint 3

The ordering is a two-key sort: `travelled_distance` descending first,
then `name` ascending to break ties.
