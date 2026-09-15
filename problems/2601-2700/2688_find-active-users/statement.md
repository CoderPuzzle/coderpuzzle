# Find Active Users

## Description

Table: `Users`

| Column Name | Type     |
| ----------- | -------- |
| user_id     | int      |
| item        | varchar  |
| created_at  | datetime |
| amount      | int      |

This table may contain duplicate records.
Each row includes the user ID, the purchased item, the date of purchase, and
the purchase amount.

Write a solution to identify active users. An active user is a user that has
made a second purchase within 7 days of any other of their purchases.

For example, if the ending date is May 31, 2023. So any date between May 31,
2023, and June 7, 2023 (inclusive) would be considered "within 7 days" of May
31, 2023.

Return a list of user_id which denotes the list of active users in any order.

Each testcase supplies its own `dataset`: the DDL seeds the `Users` table with
that testcase's rows. The result format is in the following example.

### Example 1

```text
Input:
Users table:
+---------+-------------------+------------+--------+
| user_id | item              | created_at | amount |
+---------+-------------------+------------+--------+
| 5       | Smart Crock Pot   | 2021-09-18 | 698882 |
| 6       | Smart Lock        | 2021-09-14 | 11487  |
| 6       | Smart Thermostat  | 2021-09-10 | 674762 |
| 8       | Smart Light Strip | 2021-09-29 | 630773 |
| 4       | Smart Cat Feeder  | 2021-09-02 | 693545 |
| 4       | Smart Bed         | 2021-09-13 | 170249 |
+---------+-------------------+------------+--------+
Output:
+---------+
| user_id |
+---------+
| 6       |
+---------+
Explanation:
- User with user_id 5 has only one transaction, so he is not an active user.
- User with user_id 6 has two transaction his first transaction was on 2021-09-10 and second transation was on 2021-09-14. The distance between the first and second transactions date is <= 7 days. So he is an active user.
- User with user_id 8 has only one transaction, so he is not an active user.
- User with user_id 4 has two transaction his first transaction was on 2021-09-02 and second transation was on 2021-09-13. The distance between the first and second transactions date is > 7 days. So he is not an active user.
```

A purchase date counts as "within 7 days" of another one when the two dates
are at most 7 days apart, both endpoints included — the anchor date itself
(0 days) and exactly 7 days both qualify, 8 days does not. Two purchases
recorded on the same date therefore qualify, and so do two identical
duplicate rows, which are two purchases of the same user on the same day.
Write your solution as a single `SELECT` query returning one column —
`user_id` — with each active user appearing exactly once, in any order.
