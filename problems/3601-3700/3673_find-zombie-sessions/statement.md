# Find Zombie Sessions

## Description

Table: `app_events`

| Column Name     | Type     |
| --------------- | -------- |
| event_id        | int      |
| user_id         | int      |
| event_timestamp | datetime |
| event_type      | varchar  |
| session_id      | varchar  |
| event_value     | int      |

`event_id` is the unique ID for this table. Each row records one event
fired during a visit to an app, and all rows that share a `session_id`
belong to the same visit of one user. `event_type` is one of
`'app_open'`, `'click'`, `'scroll'`, `'purchase'` or `'app_close'`.
`event_value` holds the purchase amount in dollars when the type is
`'purchase'` and the pixels scrolled when it is `'scroll'`; every other
event stores NULL. Every `event_timestamp` falls exactly on a minute
boundary.

A **zombie session** is one whose user looks busy but actually shows an
abnormal behavior pattern. A session is a zombie session when it meets
all of the following criteria:

- Its duration — the time from its earliest event timestamp to its last
  event timestamp — is more than 30 minutes.
- It contains at least 5 scroll events.
- Its click-to-scroll ratio — the number of click events divided by the
  number of scroll events — is less than 0.20.
- No purchases were made during the session.

For every zombie session, report:

- `session_duration_minutes`, its duration expressed in whole minutes.
- `scroll_count`, its number of scroll events.

Return the result table ordered by `scroll_count` in descending order,
then by `session_id` in ascending order.

Each testcase supplies its own `dataset`: its statements fill the table
before your query runs. The result format is shown in the following
example.

### Example 1

```text
Input: the app_events table from the dataset below.
event_id | user_id | event_timestamp     | event_type | session_id | event_value
1        | 201     | 2024-03-01 10:00:00 | app_open   | S001       | NULL
2        | 201     | 2024-03-01 10:05:00 | scroll     | S001       | 500
3        | 201     | 2024-03-01 10:10:00 | scroll     | S001       | 750
4        | 201     | 2024-03-01 10:15:00 | scroll     | S001       | 600
5        | 201     | 2024-03-01 10:20:00 | scroll     | S001       | 800
6        | 201     | 2024-03-01 10:25:00 | scroll     | S001       | 550
7        | 201     | 2024-03-01 10:30:00 | scroll     | S001       | 900
8        | 201     | 2024-03-01 10:35:00 | app_close  | S001       | NULL
9        | 202     | 2024-03-01 11:00:00 | app_open   | S002       | NULL
10       | 202     | 2024-03-01 11:02:00 | click      | S002       | NULL
11       | 202     | 2024-03-01 11:05:00 | scroll     | S002       | 400
12       | 202     | 2024-03-01 11:08:00 | click      | S002       | NULL
13       | 202     | 2024-03-01 11:10:00 | scroll     | S002       | 350
14       | 202     | 2024-03-01 11:15:00 | purchase   | S002       | 50
15       | 202     | 2024-03-01 11:20:00 | app_close  | S002       | NULL
16       | 203     | 2024-03-01 12:00:00 | app_open   | S003       | NULL
17       | 203     | 2024-03-01 12:10:00 | scroll     | S003       | 1000
18       | 203     | 2024-03-01 12:20:00 | scroll     | S003       | 1200
19       | 203     | 2024-03-01 12:25:00 | click      | S003       | NULL
20       | 203     | 2024-03-01 12:30:00 | scroll     | S003       | 800
21       | 203     | 2024-03-01 12:40:00 | scroll     | S003       | 900
22       | 203     | 2024-03-01 12:50:00 | scroll     | S003       | 1100
23       | 203     | 2024-03-01 13:00:00 | app_close  | S003       | NULL
24       | 204     | 2024-03-01 14:00:00 | app_open   | S004       | NULL
25       | 204     | 2024-03-01 14:05:00 | scroll     | S004       | 600
26       | 204     | 2024-03-01 14:08:00 | scroll     | S004       | 700
27       | 204     | 2024-03-01 14:10:00 | click      | S004       | NULL
28       | 204     | 2024-03-01 14:12:00 | app_close  | S004       | NULL
Output:
session_id | user_id | session_duration_minutes | scroll_count
S001       | 201     | 35                       | 6
Explanation: Session S001 runs from 10:00 to 10:35 — 35 minutes, over
the 30-minute bar. It holds 6 scrolls and no clicks, so its
click-to-scroll ratio is 0/6 = 0.00, under 0.20, and it recorded no
purchases. Every criterion holds, so S001 is a zombie session. Session
S002 lasts only 11:00 to 11:20 — 20 minutes — and includes a purchase,
so it misses two criteria however its 2 scrolls look. Session S003 also
spans more than 30 minutes (12:00 to 13:00) with 5 scrolls, but its 1
click puts the ratio at exactly 1/5 = 0.20, which is not less than
0.20, so it falls short. Session S004 lasts just 12 minutes with only
2 scrolls, missing both bars. Only S001 qualifies.
```

Answer with one `SELECT` whose output columns are `session_id`,
`user_id`, `session_duration_minutes` and `scroll_count`, in that order.
