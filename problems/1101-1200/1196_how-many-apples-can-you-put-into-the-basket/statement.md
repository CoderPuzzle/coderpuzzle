# How Many Apples Can You Put into the Basket

## Description

You have some apples and a basket that can carry up to 5000 units of
weight.

Given an integer array `weight` where `weight[i]` is the weight of the
i-th apple, return the maximum number of apples you can put in the
basket.

### Example 1

```text
Input: weight = [100,200,150,1000]
Output: 4
Explanation: All 4 apples can be carried by the basket since their sum
of weights is 1450.
```

### Example 2

```text
Input: weight = [900,950,800,1000,700,800]
Output: 5
Explanation: The sum of weights of the 6 apples exceeds 5000 so we
choose any 5 of them.
```

### Constraints

- `1 <= weight.length <= 10³`
- `1 <= weight[i] <= 10³`

## Hints

### Hint 1

What if you think in a greedy approach?

### Hint 2

The best apple to take in one step is the one with the smallest weight.

### Hint 3

Sort the array and take apples with smaller weight first.

Write your solution as a function returning the maximum number of apples
that fit.
