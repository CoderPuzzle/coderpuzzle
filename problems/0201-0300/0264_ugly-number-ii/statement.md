# Ugly Number II

## Description

An ugly number is a positive integer whose prime factors are limited to
`2`, `3`, and `5`.

Given an integer `n`, return the `n`th ugly number.

### Example 1

```text
Input: n = 10
Output: 12
Explanation: [1, 2, 3, 4, 5, 6, 8, 9, 10, 12] is the sequence of the first 10 ugly numbers.
```

### Example 2

```text
Input: n = 1
Output: 1
Explanation: 1 has no prime factors, therefore all of its prime factors are limited to 2, 3, and 5.
```

### Constraints

- `1 <= n <= 1690`

## Hints

### Hint 1

The naive approach is to test every number for ugliness until you reach the nth one; most numbers are not ugly, so generate only the ugly ones instead.

### Hint 2

An ugly number must be produced by multiplying a smaller ugly number by 2, 3, or 5.

### Hint 3

Maintain the order by merging three sorted lists: previous ugly numbers times 2, times 3, and times 5.

### Hint 4

If U_k is the kth ugly number, then U_(k+1) is the minimum of the smallest unused candidates from each of those three lists.
