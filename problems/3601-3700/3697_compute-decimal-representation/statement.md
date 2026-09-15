# Compute Decimal Representation

## Description

You are given a positive integer `n`.

A positive integer is a _base-10 component_ when it is one digit from `1` to
`9` multiplied by a power of ten — its decimal form is a single nonzero digit
followed only by zeros. So `500`, `30`, and `7` are base-10 components, while
`537`, `102`, and `11` are not.

Split `n` into a sum of base-10 components using as few components as
possible, and return those components in descending order.

### Example 1

```text
Input: n = 537
Output: [500,30,7]
Explanation: 537 splits as 500 + 30 + 7. Its three nonzero digits make any
sum built from fewer than three base-10 components impossible.
```

### Example 2

```text
Input: n = 102
Output: [100,2]
Explanation: 102 is not itself a base-10 component, so its two nonzero
digits give exactly the two-term split 100 + 2.
```

### Example 3

```text
Input: n = 6
Output: [6]
Explanation: 6 is already a base-10 component.
```

### Constraints

- `1 <= n <= 10⁹`

## Hints

### Hint 1

Walk the digits of `n` starting from the ones place.

### Hint 2

Each nonzero digit contributes exactly one base-10 component.

### Hint 3

Collect the components and return them from the largest place value down.
