# Minimum Number of Coins for Fruits II

## Description

You are at a fruit market with different types of exotic fruits on display.

You are given a 1-indexed array `prices`, where `prices[i]` denotes the number of coins needed to purchase the `i`th fruit.

The fruit market has the following offer:

- If you purchase the `i`th fruit at `prices[i]` coins, you can get the next `i` fruits for free.

Note that even if you can take fruit `j` for free, you can still purchase it for `prices[j]` coins to receive a new offer.

Return the minimum number of coins needed to acquire all the fruits.

### Example 1

```text
Input: prices = [3, 1, 2]
Output: 4
Explanation: You can acquire the fruits as follows:
- Purchase the 1st fruit with 3 coins, and you are allowed to take the 2nd fruit for free.
- Purchase the 2nd fruit with 1 coin, and you are allowed to take the 3rd fruit for free.
- Take the 3rd fruit for free.
Note that even though you were allowed to take the 2nd fruit for free, you purchased it because it is more optimal.
```

### Example 2

```text
Input: prices = [1, 10, 1, 1]
Output: 2
Explanation: You can acquire the fruits as follows:
- Purchase the 1st fruit with 1 coin, and you are allowed to take the 2nd fruit for free.
- Take the 2nd fruit for free.
- Purchase the 3rd fruit for 1 coin, and you are allowed to take the 4th fruit for free.
- Take the 4th fruit for free.
```

### Constraints

- `1 <= prices.length <= 10^5`
- `1 <= prices[i] <= 10^5`

## Hints

### Hint 1

Let dp[i] be the minimum number of coins needed to acquire the first i fruits.

### Hint 2

If the last purchased fruit is l, it must satisfy ceil(i / 2) <= l <= i, and dp[i] = dp[l - 1] + prices[l].

### Hint 3

Maintain the candidate values dp[l - 1] + prices[l] over the sliding window of valid l with a monotonic deque to compute each dp[i] in amortized constant time.
