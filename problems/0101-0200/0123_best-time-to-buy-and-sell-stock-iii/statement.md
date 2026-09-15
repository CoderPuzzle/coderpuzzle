# Best Time to Buy and Sell Stock III

## Description

You are given an array `prices` where `prices[i]` is the price of a given stock
on the i-th day.

Find the maximum profit you can achieve. You may complete **at most two
transactions**.

Note: You may not engage in multiple transactions simultaneously (i.e., you
must sell the stock before you buy again).

### Example 1

```text
Input: prices = [3,3,5,0,0,3,1,4]
Output: 6
Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.
```

### Example 2

```text
Input: prices = [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
engaging in multiple transactions at the same time. You must sell before buying again.
```

### Example 3

```text
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
```

### Constraints

- `1 <= prices.length <= 10⁵`
- `0 <= prices[i] <= 10⁵`

### Follow-up

Can you solve it with a single forward pass and constant extra space? How would
you generalize the approach if the number of allowed transactions were `k`
instead of `2`?

## Hints

### Hint 1

Describe your position after each day with four states: after the first buy,
after the first sell, after the second buy, after the second sell.

### Hint 2

Sweep the days once, keeping the best wealth achievable in each state: either
keep yesterday's state, or transition today (buy pays `-prices[i]`, sell pays
`+prices[i]` on top of the previous state).

### Hint 3

A transaction that buys and sells on the same day contributes zero profit, so
letting a degenerate transaction stand in for "do nothing" keeps the state
machine valid while never overcounting.
