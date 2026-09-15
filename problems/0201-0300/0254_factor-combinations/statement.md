# Factor Combinations

## Description

Numbers can be regarded as the product of their factors.

For example, `8 = 2 x 2 x 2 = 2 x 4`.

Given an integer `n`, return all possible combinations of its factors.

Note that the factors should be in the range `[2, n - 1]`.

For a deterministic answer, return each combination with its factors in
ascending order, and order the list of combinations by the number of
factors, fewest first, breaking ties in ascending lexicographic order.

### Example 1

```text
Input: n = 1
Output: []
```

### Example 2

```text
Input: n = 12
Output: [[2,6],[3,4],[2,2,3]]
```

### Example 3

```text
Input: n = 37
Output: []
```

### Constraints

- `1 <= n <= 10⁷`
