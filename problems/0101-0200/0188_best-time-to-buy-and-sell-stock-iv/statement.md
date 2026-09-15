# Best Time to Buy and Sell Stock IV

## Description

You are given an integer array `prices` where `prices[i]` is the price of a
given stock on the `i`th day, and an integer `k`.

Find the maximum profit you can achieve. You may complete at most `k`
transactions: that is, you may buy at most `k` times and sell at most `k`
times.

Note: You may not engage in multiple transactions simultaneously (you must
sell the stock before you buy it again).

### Example 1

```text
Input: k = 2, prices = [2,4,1]
Output: 2
Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.
```

### Example 2

```text
Input: k = 2, prices = [3,2,6,5,0,3]
Output: 7
Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4. Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
```

### Constraints

- `1 <= k <= 100`
- `1 <= prices.length <= 1000`
- `0 <= prices[i] <= 1000`

### Follow-up

Can you solve it in `O(nk)` time when `k` is small, and recognize when `k` is
large enough that the transaction limit stops mattering?

## Hints

### Hint 1

Track two values per transaction count `j` after each day: the best balance
while holding stock in the `j`-th buy, and the best profit after completing
`j` sells.

### Hint 2

On a day with price `p`: holding `j` either stays held or buys now from the
profit of `j-1` completed transactions; completed `j` either stays done or
sells the held `j`-th position now at `p`.

### Hint 3

A profitable transaction needs two distinct days, so at most `n/2`
transactions ever help — once `k` reaches that bound the limit is effectively
unlimited and a simple linear scan over consecutive differences suffices.
