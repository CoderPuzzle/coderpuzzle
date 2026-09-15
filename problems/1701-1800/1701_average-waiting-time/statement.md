# Average Waiting Time

## Description

A restaurant has a single chef. You are given an array `customers`, where
`customers[i] = [arrival_i, time_i]`:

- `arrival_i` is the arrival time of the `i`-th customer. The arrival times
  are sorted in non-decreasing order.
- `time_i` is the time needed to prepare the order of the `i`-th customer.

When a customer arrives, the order goes to the chef, who starts preparing it
once he is idle. The customer waits until the chef finishes preparing the
order. The chef never prepares food for more than one customer at a time,
and he takes the customers in the order they were given in the input.

The waiting time of a customer is the span from that customer's arrival to
the moment the chef finishes preparing the order.

Return the average waiting time of all customers. Solutions within `10⁻⁵`
from the actual answer are considered accepted.

### Example 1

```text
Input: customers = [[1,2],[2,5],[4,3]]
Output: 5.00000
Explanation: The first customer arrives at time 1; the chef takes the order
and starts preparing it immediately, finishing at time 3, so the wait is
3 - 1 = 2.
The second customer arrives at time 2; the chef is busy until time 3, takes
the order and starts at time 3, finishing at time 8, so the wait is
8 - 2 = 6.
The third customer arrives at time 4; the chef is busy until time 8, takes
the order and starts at time 8, finishing at time 11, so the wait is
11 - 4 = 7.
The average waiting time is (2 + 6 + 7) / 3 = 5.
```

### Example 2

```text
Input: customers = [[5,2],[5,4],[10,3],[20,1]]
Output: 3.25000
Explanation: The first customer arrives at time 5; the chef starts
immediately, finishing at time 7, so the wait is 7 - 5 = 2.
The second customer arrives at time 5; the chef is busy until time 7, takes
the order and starts at time 7, finishing at time 11, so the wait is
11 - 5 = 6.
The third customer arrives at time 10; the chef is busy until time 11, takes
the order and starts at time 11, finishing at time 14, so the wait is
14 - 10 = 4.
The fourth customer arrives at time 20; the chef is idle and starts
immediately, finishing at time 21, so the wait is 21 - 20 = 1.
The average waiting time is (2 + 6 + 4 + 1) / 4 = 3.25.
```

### Constraints

- `1 <= customers.length <= 10⁵`
- `1 <= arrival_i, time_i <= 10⁴`
- `arrival_i <= arrival_(i+1)`

## Hints

### Hint 1

Walk through the customers in order, carrying the time at which the chef
will have finished the orders already taken.

### Hint 2

If that time is no later than the current arrival, the chef is idle and
starts at the arrival time; otherwise the customer waits until the chef
frees up.

### Hint 3

The finish time moves to the start time plus the preparation time, and the
customer's wait is that finish time minus the arrival time.
