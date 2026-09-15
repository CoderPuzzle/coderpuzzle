# Coin Change

## Description

You are given an integer array `coins` representing coins of different
denominations and an integer `amount` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If
that amount of money cannot be made up by any combination of the coins,
return `-1`.

You may assume that you have an infinite number of each kind of coin.

### Example 1

```text
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
```

### Example 2

```text
Input: coins = [2], amount = 3
Output: -1
```

### Example 3

```text
Input: coins = [1], amount = 0
Output: 0
```

### Constraints

- `1 <= coins.length <= 12`
- `1 <= coins[i] <= 2^31 - 1`
- `0 <= amount <= 10^4`

## Hints

### Hint 1

Think about the subproblem: the minimum number of coins needed to make each amount from 0 up to amount.

### Hint 2

For each amount a, try every coin c; if c <= a, the candidate is dp[a - c] + 1, and you keep the minimum.

### Hint 3

Initialize dp[0] = 0 and every other amount to infinity; if dp[amount] is still infinite at the end, return -1.
