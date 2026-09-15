# Largest Multiple of Three

## Description

Given an integer array `digits`, return the largest multiple of three that can
be formed by concatenating some of the given digits in any order. If there is
no answer, return an empty string.

Since the answer may not fit in an integer data type, return it as a string.
The returned answer must not contain unnecessary leading zeros.

### Example 1

```text
Input: digits = [8,1,9]
Output: "981"
```

### Example 2

```text
Input: digits = [8,6,7,1,0]
Output: "8760"
```

### Example 3

```text
Input: digits = [1]
Output: ""
```

### Constraints

- `1 <= digits.length <= 10^4`
- `0 <= digits[i] <= 9`

## Hints

### Hint 1

A number is a multiple of three if and only if its sum of digits is a multiple
of three.

### Hint 2

Use dynamic programming.

### Hint 3

To find the maximum number, try to maximize the number of digits of the number.

### Hint 4

Sort the digits in descending order to find the maximum number.
