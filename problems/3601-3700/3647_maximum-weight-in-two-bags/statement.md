# Maximum Weight in Two Bags

## Description

You are given an integer array `weights` and two integers `w1` and `w2`, the
maximum capacities of two bags.

Each item may be placed in at most one of the bags. Bag 1 may hold at most
`w1` total weight and bag 2 may hold at most `w2` total weight, and any item
may also be left out entirely. Return the maximum total weight that can be
packed into the two bags.

### Example 1

```text
Input: weights = [1,4,3,2], w1 = 5, w2 = 4
Output: 9
Explanation: Bag 1 carries weights[2] = 3 and weights[3] = 2, so 3 + 2 = 5,
which fits within w1. Bag 2 carries weights[1] = 4, which fits within w2.
The packed weight is 5 + 4 = 9.
```

### Example 2

```text
Input: weights = [3,6,4,8], w1 = 9, w2 = 7
Output: 15
Explanation: Bag 1 carries weights[3] = 8, which fits within w1. Bag 2
carries weights[0] = 3 and weights[2] = 4, so 3 + 4 = 7, which fits within
w2. The packed weight is 8 + 7 = 15.
```

### Example 3

```text
Input: weights = [5,7], w1 = 2, w2 = 3
Output: 0
Explanation: Neither item fits in either bag, so nothing can be packed.
```

### Constraints

- `1 <= weights.length <= 100`
- `1 <= weights[i] <= 100`
- `1 <= w1, w2 <= 300`

## Hints

### Hint 1

Use dynamic programming.

### Hint 2

Track the pair of used capacities: a state `(i, j)` is reachable when some
subset of the items processed so far fills bag 1 to exactly `i` and bag 2 to
exactly `j`. Each new item leaves a reachable state alone, extends bag 1 by
its weight, or extends bag 2 by its weight.
