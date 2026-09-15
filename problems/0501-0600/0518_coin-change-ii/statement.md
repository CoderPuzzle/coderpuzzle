# Coin Change II

## Description

You are given an integer array `coins` representing coins of different
denominations and an integer `amount` representing a total amount of money.
Return the number of combinations that make up that amount. If that amount of
money cannot be made up by any combination of the coins, return `0`.

You may assume that you have an infinite number of each kind of coin.

### Example 1

```text
Input: amount = 5, coins = [1,2,5]
Output: 4
Explanation: there are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1
```

### Example 2

```text
Input: amount = 3, coins = [2]
Output: 0
Explanation: the amount of 3 cannot be made up just with coins of 2.
```

### Example 3

```text
Input: amount = 10, coins = [10]
Output: 1
```

### Constraints

- `1 <= coins.length <= 300`
- `1 <= coins[i] <= 5000`
- All the values of `coins` are unique.
- `0 <= amount <= 5000`
- The answer is guaranteed to fit in a signed 32-bit integer.

## Hints

### Hint 1

Let dp[a] be the number of combinations that sum to exactly a. The base case
is dp[0] = 1 — the empty combination.

### Hint 2

Process one denomination at a time: for each coin c, run a left-to-right
pass updating dp[a] += dp[a - c] for a from c up to amount. Iterating amounts
upward lets the same coin be reused any number of times.

### Hint 3

The loop order is what makes this count combinations rather than ordered
sequences: finishing all amounts for one coin before moving to the next means
a combination is built in a fixed coin order, so it is counted exactly once.
Swapping the loops (amounts outside, coins inside) counts permutations instead.
