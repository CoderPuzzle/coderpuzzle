# Maximum Number of Consecutive Values You Can Make

## Description

You are given an integer array `coins` of length `n` which represents the `n`
coins that you own. The value of the `i`th coin is `coins[i]`. You can make
some value `x` if you can choose some of your `n` coins such that their values
sum up to `x`.

Return the maximum number of consecutive integer values that you can make with
your coins starting from and including `0`.

Note that you may have multiple coins of the same value.

### Example 1

```text
Input: coins = [1,3]
Output: 2
Explanation: You can make the following values:
- 0: take []
- 1: take [1]
You can make 2 consecutive integer values starting from 0.
```

### Example 2

```text
Input: coins = [1,1,1,4]
Output: 8
Explanation: You can make the following values:
- 0: take []
- 1: take [1]
- 2: take [1,1]
- 3: take [1,1,1]
- 4: take [4]
- 5: take [4,1]
- 6: take [4,1,1]
- 7: take [4,1,1,1]
You can make 8 consecutive integer values starting from 0.
```

### Example 3

```text
Input: coins = [1,4,10,3,1]
Output: 20
```

### Constraints

- `coins.length == n`
- `1 <= n <= 4 * 10⁴`
- `1 <= coins[i] <= 4 * 10⁴`

## Hints

### Hint 1

If you can make every value in [0, x] and you next use a coin v with v <= x + 1, you can then make every value up to x + v.

### Hint 2

Sort the coins. You can always make 0, so start with x = 0.

### Hint 3

Process the coins from smallest to largest and stop at the first coin larger than x + 1.
