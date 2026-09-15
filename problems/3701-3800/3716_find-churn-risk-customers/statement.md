# Find Churn Risk Customers

## Description

Table: `subscription_events`

| Column Name    | Type    |
| -------------- | ------- |
| event_id       | int     |
| user_id        | int     |
| event_date     | date    |
| event_type     | varchar |
| plan_name      | varchar |
| monthly_amount | decimal |

`event_id` is the unique ID for this table. Each row records one change
to a user's subscription: `event_type` is one of `'start'`,
`'upgrade'`, `'downgrade'` or `'cancel'`; `plan_name` is one of
`'basic'`, `'standard'` or `'premium'`, and is NULL exactly when the
event is a `'cancel'`; `monthly_amount` is the monthly subscription
cost in effect after this event, and is 0 on `'cancel'` rows.

A user is a _churn risk customer_ when all of the following hold:

- Their subscription is currently active — their most recent event is
  not a `'cancel'`.
- At least one `'downgrade'` appears anywhere in their history.
- Their current plan revenue is less than half of their historical
  maximum plan revenue — the `monthly_amount` carried by their most
  recent event is strictly under 50% of the largest `monthly_amount`
  across all of their events. Exactly half does not qualify.
- They have been a subscriber for at least 60 days.

`days_as_subscriber` counts from a user's first event date to their
last event date as the plain difference in days. All events of a
single user fall on distinct dates, so their first and last events are
always unambiguous.

Report every churn risk customer as:

- `current_plan`, the plan named by their most recent event;
- `current_monthly_amount`, that event's `monthly_amount`;
- `max_historical_amount`, the largest `monthly_amount` they ever had;
- `days_as_subscriber`.

Return the result table ordered by `days_as_subscriber` in descending
order, then by `user_id` in ascending order.

Each testcase supplies its own `dataset`: its statements fill the table
before your query runs. The result format is shown in the following
example.

### Example 1

```text
Input: the subscription_events table from the dataset below.
event_id | user_id | event_date | event_type | plan_name | monthly_amount
1        | 501     | 2024-01-01 | start      | premium   | 29.99
2        | 501     | 2024-02-15 | downgrade  | standard  | 19.99
3        | 501     | 2024-03-20 | downgrade  | basic     | 9.99
4        | 502     | 2024-01-05 | start      | standard  | 19.99
5        | 502     | 2024-02-10 | upgrade    | premium   | 29.99
6        | 502     | 2024-03-15 | downgrade  | basic     | 9.99
7        | 503     | 2024-01-10 | start      | basic     | 9.99
8        | 503     | 2024-02-20 | upgrade    | standard  | 19.99
9        | 503     | 2024-03-25 | upgrade    | premium   | 29.99
10       | 504     | 2024-01-15 | start      | premium   | 29.99
11       | 504     | 2024-03-01 | downgrade  | standard  | 19.99
12       | 504     | 2024-03-30 | cancel     | NULL      | 0.00
13       | 505     | 2024-02-01 | start      | basic     | 9.99
14       | 505     | 2024-02-28 | upgrade    | standard  | 19.99
15       | 506     | 2024-01-20 | start      | premium   | 29.99
16       | 506     | 2024-03-10 | downgrade  | basic     | 9.99
Output:
user_id | current_plan | current_monthly_amount | max_historical_amount | days_as_subscriber
501     | basic        | 9.99                   | 29.99                 | 79
502     | basic        | 9.99                   | 29.99                 | 70
Explanation: Users 501 and 502 both end on an active basic plan after
downgrading, and their current 9.99 sits well under half of the 29.99
high-water mark each once held; spanning 79 and 70 days respectively,
both clear the 60-day floor, so they qualify. User 503 only ever moved
up — no downgrade ever appears, so they are out regardless of how
healthy the rest of the record looks. User 505 also upgraded without a
single downgrade and is out for the same reason. User 504's last event
is a cancel, ending their subscription, so they are out too. User 506
mirrors 501 and 502 — active, downgraded, revenue collapsed below
half — but Jan 20 to Mar 10 spans just 50 days, short of the floor,
so duration alone disqualifies them.
```

Answer with one `SELECT` whose output columns are `user_id`,
`current_plan`, `current_monthly_amount`, `max_historical_amount` and
`days_as_subscriber`, in that order.
