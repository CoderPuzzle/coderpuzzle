# Find Golden Hour Customers

## Description

Table: `restaurant_orders`

| Column Name     | Type     |
| --------------- | -------- |
| order_id        | int      |
| customer_id     | int      |
| order_timestamp | datetime |
| order_amount    | decimal  |
| payment_method  | varchar  |
| order_rating    | int      |

`order_id` is the unique ID for this table. Each row records one food
order: `payment_method` is one of `'cash'`, `'card'` or `'app'`,
`order_timestamp` carries both the date and the time of day, and
`order_rating` scores the order from 1 to 5, where 5 is best, or is NULL
when the customer did not rate it.

Call an order a _peak-hour order_ when its time of day falls in the
lunch window from 11:00 inclusive up to 14:00 exclusive, or in the
evening window from 18:00 inclusive up to 21:00 exclusive; the date part
never matters. A customer is a _golden hour customer_ when all of the
following hold:

- They made at least 3 orders.
- At least 60% of their orders are peak-hour orders.
- They rated at least half of their orders, and their average rating
  over rated orders is at least 4.0.

Both bars are judged on the exact ratios; nothing is rounded before a
customer qualifies. Report every qualifying customer as:

- `total_orders`, their total number of orders;
- `peak_hour_percentage`, their exact peak share scaled to a percentage
  and rounded to two decimal places;
- `average_rating`, their exact average over rated orders rounded to two
  decimal places.

Return the result table ordered by `average_rating` in descending order,
then by `customer_id` in descending order.

Each testcase supplies its own `dataset`: its statements fill the table
before your query runs. The result format is shown in the following
example.

### Example 1

```text
Input: the restaurant_orders table from the dataset below.
order_id | customer_id | order_timestamp     | order_amount | payment_method | order_rating
1        | 101         | 2024-03-01 12:30:00 | 25.50        | card           | 5
2        | 101         | 2024-03-02 19:15:00 | 32.00        | app            | 4
3        | 101         | 2024-03-03 13:45:00 | 28.75        | card           | 5
4        | 101         | 2024-03-04 20:30:00 | 41.00        | app            | NULL
5        | 102         | 2024-03-01 11:30:00 | 18.50        | cash           | 4
6        | 102         | 2024-03-02 12:00:00 | 22.00        | card           | 3
7        | 102         | 2024-03-03 15:30:00 | 19.75        | cash           | NULL
8        | 103         | 2024-03-01 19:00:00 | 55.00        | app            | 5
9        | 103         | 2024-03-02 20:45:00 | 48.50        | app            | 4
10       | 103         | 2024-03-03 18:30:00 | 62.00        | card           | 5
11       | 104         | 2024-03-01 10:00:00 | 15.00        | cash           | 3
12       | 104         | 2024-03-02 09:30:00 | 18.00        | cash           | 2
13       | 104         | 2024-03-03 16:00:00 | 20.00        | card           | 3
14       | 105         | 2024-03-01 12:15:00 | 30.00        | app            | 4
15       | 105         | 2024-03-02 13:00:00 | 35.50        | app            | 5
16       | 105         | 2024-03-03 11:45:00 | 28.00        | card           | 4
Output:
customer_id | total_orders | peak_hour_percentage | average_rating
103         | 3            | 100                  | 4.67
101         | 4            | 100                  | 4.67
105         | 3            | 100                  | 4.33
Explanation: Customer 101 placed 4 orders and all four landed inside a
peak window, so the peak share is 100%; they rated 3 of the 4 (75%, over
the half bar) for an average of (5+4+5)/3 = 4.67 — every bar clears.
Customer 102 cleared the order floor, the peak bar at 66.67%, and
coverage at 66.67%, but their two ratings average (4+3)/2 = 3.5, under
4.0. Customer 103 spent all three orders in the evening window, rated
all three, and hit the same 4.67 average as 101; with equal averages the
larger id comes first. Customer 104 never ordered inside a peak window
(0%), so they fail no matter how their ratings look. Customer 105 took
all three orders in the lunch window, rated all three, and averaged
(4+5+4)/3 = 4.33.
```

Answer with one `SELECT` whose output columns are `customer_id`,
`total_orders`, `peak_hour_percentage` and `average_rating`, in that
order.
