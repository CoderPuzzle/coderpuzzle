# Minimum Number of Days to Eat N Oranges

## Description

There are `n` oranges in the kitchen, and you decide to eat some of them
every day according to these rules:

- Eat one orange.
- If the number of remaining oranges `n` is divisible by `2`, you may eat
  `n / 2` of them.
- If the number of remaining oranges `n` is divisible by `3`, you may eat
  `2 * (n / 3)` of them.

You may take only one of these actions per day.

Given the integer `n`, return the minimum number of days needed to eat all
`n` oranges.

### Example 1

```text
Input: n = 10
Output: 4
Explanation: You have 10 oranges.
Day 1: Eat 1 orange, 10 - 1 = 9.
Day 2: Eat 6 oranges, 9 - 2 * (9 / 3) = 9 - 6 = 3 (9 is divisible by 3).
Day 3: Eat 2 oranges, 3 - 2 * (3 / 3) = 3 - 2 = 1.
Day 4: Eat the last orange, 1 - 1 = 0.
You need at least 4 days to eat the 10 oranges.
```

### Example 2

```text
Input: n = 6
Output: 3
Explanation: You have 6 oranges.
Day 1: Eat 3 oranges, 6 - 6 / 2 = 6 - 3 = 3 (6 is divisible by 2).
Day 2: Eat 2 oranges, 3 - 2 * (3 / 3) = 3 - 2 = 1 (3 is divisible by 3).
Day 3: Eat the last orange, 1 - 1 = 0.
You need at least 3 days to eat the 6 oranges.
```

### Constraints

- `1 <= n <= 2 * 10^9`

## Hints

### Hint 1

At each state, choose between two options: `minDays(n) = 1 + min(n % 2 +
minDays(n / 2), n % 3 + minDays(n / 3))`, where `minDays(n)` is the minimum
number of days to eat `n` oranges.
