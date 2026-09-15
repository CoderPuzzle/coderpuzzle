# Maximum Number of Items From Sale II

## Description

You are given `items`, where `items[i] = [factorᵢ, priceᵢ]`, and a `budget`. Unlimited copies may be bought. Each purchased copy of type `i` can yield at most one free copy of a different type `j` whose factor is divisible by `factorᵢ`. Each ordered pair `(i, j)` may yield at most one free copy.

Return the maximum number of purchased and free copies obtainable.

### Example 1

```text
Input: items = [[1,6],[2,4],[3,5]], budget = 19
Output: 5
```

### Example 2

```text
Input: items = [[2,8],[1,10],[6,6],[4,12],[5,20],[5,17]], budget = 35
Output: 7
```

### Constraints

- `1 <= items.length <= 10⁵`
- `1 <= factorᵢ <= items.length`
- `1 <= priceᵢ <= 10⁹`
- `1 <= budget <= 10⁹`

## Hints

### Hint 1

For type `i`, the first `gain[i]` copies each contribute two total copies; later copies contribute one.

### Hint 2

Sort boosted marginal units by price in batches. Remaining ordinary copies always use the cheapest price.
