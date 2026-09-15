# Kth Smallest Amount With Single Denomination Combination

## Description

You are given an integer array `coins` representing coins of different
denominations and an integer `k`.

You have an infinite number of coins of each denomination. However, you are
not allowed to combine coins of different denominations.

Return the `k`-th smallest amount that can be made using these coins.

### Example 1

```text
Input: coins = [3,6,9], k = 3
Output: 9
Explanation: The given coins can make the following amounts:
Coin 3 produces multiples of 3: 3, 6, 9, 12, 15, etc.
Coin 6 produces multiples of 6: 6, 12, 18, 24, etc.
Coin 9 produces multiples of 9: 9, 18, 27, 36, etc.
All of the coins combined produce: 3, 6, 9, 12, 15, etc.
```

### Example 2

```text
Input: coins = [5,2], k = 7
Output: 12
Explanation: The given coins can make the following amounts:
Coin 5 produces multiples of 5: 5, 10, 15, 20, etc.
Coin 2 produces multiples of 2: 2, 4, 6, 8, 10, 12, etc.
All of the coins combined produce: 2, 4, 5, 6, 8, 10, 12, 14, 15, etc.
```

### Constraints

- `1 <= coins.length <= 15`
- `1 <= coins[i] <= 25`
- `1 <= k <= 2 * 10⁹`
- `coins` contains pairwise distinct integers.

## Hints

### Hint 1

Binary search the answer x.

### Hint 2

Use the inclusion-exclusion principle to count the number of distinct amounts that can be made up to x.
