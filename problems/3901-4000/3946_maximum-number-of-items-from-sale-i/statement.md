# Maximum Number of Items From Sale I

## Description

You are given `items`, where `items[i] = [factorᵢ, priceᵢ]`, and a `budget`. Unlimited copies may be purchased within the budget. If item type `i` is purchased at least once, you receive one free copy of every other type `j` for which `factorᵢ` divides `factorⱼ`. Multiple purchases of type `i` do not repeat this benefit, while one type may be received from several different types.

Return the maximum number of purchased and free copies obtainable.

### Example 1

```text
Input: items = [[6,2],[2,6],[3,4]], budget = 9
Output: 4
```

### Example 2

```text
Input: items = [[2,4],[3,2],[4,1],[6,4],[12,4]], budget = 8
Output: 10
```

### Constraints

- `1 <= items.length <= 1000`
- `1 <= factorᵢ, priceᵢ <= 1500`
- `1 <= budget <= 1500`

## Hints

### Hint 1

Precompute how many item factors are divisible by each factor.

### Hint 2

The first purchased copy activates all free copies; later copies add only one. Use grouped knapsack DP.
