# Best Time to Buy and Sell Stock with Cooldown

## Description

You are given an array `prices` where `prices[i]` is the price of a given stock
on the i-th day.

Find the maximum profit you can achieve. You may complete as many transactions
as you like (i.e., buy one and sell one share of the stock multiple times) with
the following restriction: after you sell your stock, you cannot buy stock on
the next day (i.e., cooldown one day).

Note: You may not engage in multiple transactions simultaneously (i.e., you
must sell the stock before you buy again).

### Example 1

```text
Input: prices = [1,2,3,0,2]
Output: 3
Explanation: transactions = [buy, sell, cooldown, buy, sell], total profit = (2 - 1) + (2 - 0) = 3.
```

### Example 2

```text
Input: prices = [1]
Output: 0
Explanation: No transaction is done, i.e. max profit = 0.
```

### Constraints

- `1 <= prices.length <= 5000`
- `0 <= prices[i] <= 1000`

### Follow-up

Can you solve it with a single forward pass and constant extra space?

## Hints

### Hint 1

Describe your position at the end of each day with three states: holding a
share, just sold today, or resting (holding nothing, free to buy).

### Hint 2

Sweep the days once, keeping the best wealth achievable in each state. The only
subtlety is the transition into "holding": you may only buy from the "resting"
wealth of yesterday, because a sale yesterday forces a cooldown today.

### Hint 3

Keep yesterday's "just sold" value in a temporary variable before updating the
other states, so the resting state only absorbs sales that happened two or more
days ago.
