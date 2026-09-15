# Find Users with Persistent Behavior Patterns

## Description

Table: `activity`

| Column Name | Type    |
| ----------- | ------- |
| user_id     | int     |
| action_date | date    |
| action      | varchar |

(`user_id`, `action_date`, `action`) is the primary key (unique value) for
this table. Each row represents a user performing a specific action on a
given date.

Write a solution to identify behaviorally stable users based on the
following definition:

- A user is considered behaviorally stable if there exists a sequence of
  at least 5 consecutive days such that:
    - The user performed exactly one action per day during that period.
    - The action is the same on all those consecutive days.
- If a user has multiple qualifying sequences, only consider the sequence
  with the maximum length.

Return the result table ordered by `streak_length` in descending order,
then by `user_id` in ascending order.

Each testcase's `dataset` seeds the `activity` table: its script inserts
the testcase's `activity` rows before your query runs. The result format
is in the following example.

### Example 1

```text
Input:
activity table:
+---------+-------------+--------+
| user_id | action_date | action |
+---------+-------------+--------+
| 1       | 2024-01-01  | login  |
| 1       | 2024-01-02  | login  |
| 1       | 2024-01-03  | login  |
| 1       | 2024-01-04  | login  |
| 1       | 2024-01-05  | login  |
| 1       | 2024-01-06  | logout |
| 2       | 2024-01-01  | click  |
| 2       | 2024-01-02  | click  |
| 2       | 2024-01-03  | click  |
| 2       | 2024-01-04  | click  |
| 3       | 2024-01-01  | view   |
| 3       | 2024-01-02  | view   |
| 3       | 2024-01-03  | view   |
| 3       | 2024-01-04  | view   |
| 3       | 2024-01-05  | view   |
| 3       | 2024-01-06  | view   |
| 3       | 2024-01-07  | view   |
+---------+-------------+--------+
Output:
+---------+--------+---------------+------------+------------+
| user_id | action | streak_length | start_date | end_date   |
+---------+--------+---------------+------------+------------+
| 3       | view   | 7             | 2024-01-01 | 2024-01-07 |
| 1       | login  | 5             | 2024-01-01 | 2024-01-05 |
+---------+--------+---------------+------------+------------+
Explanation: User 1 performed login from 2024-01-01 to 2024-01-05 on
consecutive days; each day has exactly one action, and the action is the
same; streak length = 5 (meets minimum requirement); the action changes
on 2024-01-06, ending the streak. User 2 performed click for only 4
consecutive days, does not meet the minimum streak length of 5, and is
excluded from the result. User 3 performed view for 7 consecutive days;
this is the longest valid sequence for this user; included in the
result. The Results table is ordered by streak_length in descending
order, then by user_id in ascending order.
```

Write your solution as a single `SELECT` query returning `user_id`,
`action`, `streak_length`, `start_date`, and `end_date` for every
qualifying user, ordered by `streak_length` descending then `user_id`
ascending.
