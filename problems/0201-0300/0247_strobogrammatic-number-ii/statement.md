# Strobogrammatic Number II

## Description

Given an integer `n`, return all the strobogrammatic numbers that are of
length `n`.

A strobogrammatic number is a number that looks the same when rotated 180
degrees (looked at upside down).

For a deterministic answer, return the strings sorted in ascending
lexicographic order.

### Example 1

```text
Input: n = 2
Output: ["11","69","88","96"]
```

### Example 2

```text
Input: n = 1
Output: ["0","1","8"]
```

### Constraints

- `1 <= n <= 14`

## Hints

### Hint 1

Try to use recursion and notice that it should recurse with n - 2 instead of n - 1.
