# Maximum Value of K Coins From Piles

## Description

There are `n` piles of coins on a table. Each pile consists of a positive
number of coins of assorted denominations.

In one move, you can choose any coin on top of any pile, remove it, and add
it to your wallet.

Given a list `piles`, where `piles[i]` is a list of integers denoting the
composition of the `ith` pile from top to bottom, and a positive integer `k`,
return the maximum total value of coins you can have in your wallet if you
choose exactly `k` coins optimally.

### Example 1

```text
Input: piles = [[1,100,3],[7,8,9]], k = 2
Output: 101
Explanation:
The above diagram shows the different ways we can choose k coins.
The maximum total we can obtain is 101.
```

![Three ways to take k = 2 coins from the two piles: 1 and 100 from pile 0 for 101, 1 and 7 for 8, or 7 and 8 for 15.](figures/example-1.svg)

### Example 2

```text
Input: piles = [[100],[100],[100],[100],[100],[100],[1,1,1,1,1,1,700]], k = 7
Output: 706
Explanation:
The maximum total can be obtained if we choose all coins from the last pile.
```

### Constraints

- `n == piles.length`
- `1 <= n <= 1000`
- `1 <= piles[i][j] <= 10^5`
- `1 <= k <= sum(piles[i].length) <= 2000`

## Hints

### Hint 1

For each pile i, what will be the total value of coins we can collect if we choose the first j coins?

### Hint 2

How can you use dynamic programming over the piles — combining how many coins to take from each pile — to find the most optimal answer?
