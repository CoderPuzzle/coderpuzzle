# Best Time to Buy and Sell Stock with Transaction Fee

## Description

You are given an array `prices` where `prices[i]` is the price of a given stock
on the i-th day, and an integer `fee` representing a transaction fee.

Find the maximum profit you can achieve. You may complete as many transactions
as you like, but you need to pay the transaction fee for each transaction.

Note:

- You may not engage in multiple transactions simultaneously (i.e., you must
  sell the stock before you buy again).
- The transaction fee is only charged once for each stock purchase and sale.

### Example 1

```text
Input: prices = [1,3,2,8,4,9], fee = 2
Output: 8
Explanation: The maximum profit can be achieved by buying at prices[0] = 1,
selling at prices[3] = 8, buying at prices[4] = 4, and selling at prices[5] = 9.
The total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 8.
```

### Example 2

```text
Input: prices = [1,3,7,5,10,3], fee = 3
Output: 6
Explanation: The maximum profit can be achieved by buying at prices[0] = 1 and
selling at prices[4] = 10. The total profit is (10 - 1) - 3 = 6.
```

### Constraints

- `1 <= prices.length <= 5 * 10⁴`
- `1 <= prices[i] < 5 * 10⁴`
- `0 <= fee < 5 * 10⁴`

### Follow-up

Can you solve it with a single forward pass and constant extra space? How does
the fee change the state machine compared to the unlimited-transactions
problem where every trade is free?

## Hints

### Hint 1

After any day you are in exactly one of two states: holding one share, or
holding none. Track the best wealth achievable in each.

### Hint 2

From one day to the next, holding either keeps yesterday's share or buys at
today's price; cash either keeps yesterday's cash or sells today, paying the
fee. Take the maximum of the two options per state.

### Hint 3

When the fee makes every possible trade unprofitable, the answer is simply 0 —
make sure your recurrence never forces a transaction.
