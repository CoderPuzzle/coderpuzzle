# Friend Requests I: Overall Acceptance Rate

## Description

Table: `FriendRequest`

| Column Name  | Type |
| ------------ | ---- |
| sender_id    | int  |
| send_to_id   | int  |
| request_date | date |

Table: `RequestAccepted`

| Column Name  | Type |
| ------------ | ---- |
| requester_id | int  |
| accepter_id  | int  |
| accept_date  | date |

Neither table has a primary key: both may contain duplicate rows. A
`FriendRequest` row records that user `sender_id` sent a friend request to
user `send_to_id` on `request_date`; a `RequestAccepted` row records that
user `accepter_id` accepted user `requester_id`'s request on
`accept_date`.

Write a solution to find the overall acceptance rate of requests, rounded
to 2 decimal places: the number of accepted requests divided by the number
of requests.

Three notes pin the counting:

- The accepted requests are not necessarily found in `FriendRequest`.
  Count the total accepted requests — whether or not each one corresponds
  to a sent request — and divide by the number of requests.
- A sender may send multiple requests to the same receiver, and a request
  may be accepted more than once. Such duplicated requests or
  acceptances count only once: the unit of counting is the pair of users.
- If there are no requests at all, return `0.00` as the accept rate.

Each testcase supplies its own `dataset`: the DDL seeds both tables with
that testcase's rows, dates in ISO `YYYY-MM-DD` form; a table that
receives no rows in a testcase is simply never inserted into. The result
format is in the following example.

### Example 1

```text
Input: FriendRequest and RequestAccepted tables from the dataset below.
Output:
accept_rate
0.8
Explanation: there are 5 distinct requested pairs, (1,2), (1,3), (1,4),
(2,3) and (3,4). There are 4 distinct accepted pairs — (1,2), (1,3),
(2,3) and (3,4) — because the two (3,4) acceptances are one pair counted
once. The rate is 4/5 = 0.80.
```

Write your solution as a single `SELECT` query returning one column —
`accept_rate`, the overall acceptance rate rounded to two decimal places —
as a single row.

Follow up: could you find the acceptance rate for every month? Could you
find the cumulative acceptance rate for every day?

## Hints

### Hint 1

Both terms of the rate are counts of distinct user pairs: `SELECT DISTINCT sender_id, send_to_id FROM FriendRequest` (and its `requester_id, accepter_id` twin on `RequestAccepted`) collapses every duplicate to one row per pair, and `COUNT(*)` over each gives the two terms. The date columns never enter the counting — a repeat of the same pair on a later date is still the same pair.

### Hint 2

An acceptance counts in the numerator even when no matching request exists — nothing joins the two tables; each side is reduced to its own distinct pairs first. Direction is part of the pair: `(1,2)` and `(2,1)` are different requests and different acceptances, so the `DISTINCT` spans both id columns in their table's own order.

### Hint 3

The arithmetic carries two guards: multiply the acceptance count by `1.0` before dividing — SQLite's integer `1/3` truncates to `0` — and map the no-requests case to the required `0.00`, either by `ROUND(COALESCE(accepts * 1.0 / NULLIF(requests, 0), 0), 2)` or by a `CASE` on the request count. `ROUND(x, 2)` rounds to two decimals, ties going up (`1/8` is exactly `0.125` and rounds to `0.13`). Each aggregate returns exactly one row even over an empty table, so the query yields a single row.
