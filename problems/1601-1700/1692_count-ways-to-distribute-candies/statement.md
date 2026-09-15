# Count Ways to Distribute Candies

## Description

There are `n` unique candies (labeled `1` through `n`) and `k` bags. You are
asked to distribute all the candies into the bags such that every bag has at
least one candy.

There can be multiple ways to distribute the candies. Two ways are considered
different if the candies in one bag in the first way are not all in the same
bag in the second way. The order of the bags and the order of the candies
within each bag do not matter.

For example, `(1), (2,3)` and `(2), (1,3)` are considered different because
candies 2 and 3 in the bag `(2,3)` in the first way are not in the same bag in
the second way (they are split between the bags `(2)` and `(1,3)`). However,
`(1), (2,3)` and `(3,2), (1)` are considered the same because the candies in
each bag are all in the same bags in both ways.

Given two integers, `n` and `k`, return the number of different ways to
distribute the candies. As the answer may be too large, return it modulo
`10⁹ + 7`.

### Example 1

![diagram](figures/1692-1.svg)

```text
Input: n = 3, k = 2
Output: 3
Explanation: You can distribute 3 candies into 2 bags in 3 ways:
(1), (2,3)
(1,2), (3)
(1,3), (2)
```

### Example 2

```text
Input: n = 4, k = 2
Output: 7
Explanation: You can distribute 4 candies into 2 bags in 7 ways:
(1), (2,3,4)
(1,2), (3,4)
(1,3), (2,4)
(1,4), (2,3)
(1,2,3), (4)
(1,2,4), (3)
(1,3,4), (2)
```

### Example 3

```text
Input: n = 20, k = 5
Output: 206085257
Explanation: You can distribute 20 candies into 5 bags in 749206090500 ways.
749206090500 modulo 10⁹ + 7 = 206085257.
```

### Constraints

- `1 <= k <= n <= 1000`

## Hints

### Hint 1

Try to define a recursive approach. For the `i`th candy, there will be one of
the two following cases:

### Hint 2

If the `i - 1` previous candies are already distributed into `k` bags, the
`i`th candy can go into any of those `k` bags, giving `k * dp[n - 1][k]` ways.
We need then to solve the state of `(n - 1, k)`.

### Hint 3

If the `i - 1` previous candies are already distributed into `k - 1` bags, the
`i`th candy must go into a new bag, giving `dp[n - 1][k - 1]` ways. We need
then to solve the state of `(n - 1, k - 1)`.

### Hint 4

This approach will be too slow and will traverse some states more than once.
We should use memoization to make the algorithm efficient.
