# Number of Dice Rolls With Target Sum

## Description

You have `n` dice, and each dice has `k` faces numbered from `1` to `k`.

Given three integers `n`, `k`, and `target`, return the number of possible
ways (out of the `k^n` total ways) to roll the dice, so that the sum of the
face-up numbers equals `target`. Since the answer may be too large, return it
modulo `10^9 + 7`.

### Example 1

```text
Input: n = 1, k = 6, target = 3
Output: 1
Explanation: You throw one die with 6 faces.
There is only one way to get a sum of 3.
```

### Example 2

```text
Input: n = 2, k = 6, target = 7
Output: 6
Explanation: You throw two dice, each with 6 faces.
There are 6 ways to get a sum of 7: 1+6, 2+5, 3+4, 4+3, 5+2, 6+1.
```

### Example 3

```text
Input: n = 30, k = 30, target = 500
Output: 222616187
Explanation: The answer must be returned modulo 10^9 + 7.
```

### Constraints

- `1 <= n, k <= 30`
- `1 <= target <= 1000`

## Hints

### Hint 1

Use dynamic programming: the states are how many dice are still unrolled and what sum has been accumulated so far.

### Hint 2

Each new die contributes a face value f between 1 and k, so ways(i, t) sums ways(i-1, t-f) over all valid f.

### Hint 3

Keep every count modulo 10^9 + 7 as you fill the table.
