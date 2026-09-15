# Find the Largest Palindrome Divisible by K

## Description

You are given two positive integers `n` and `k`.

An integer `x` is called **k-palindromic** if:

- `x` is a palindrome.
- `x` is divisible by `k`.

Return the largest integer having `n` digits (as a string) that is
k-palindromic.

Note that the integer must not have leading zeros.

### Example 1

```text
Input: n = 3, k = 5
Output: "595"
Explanation: 595 is the largest k-palindromic integer with 3 digits.
```

### Example 2

```text
Input: n = 1, k = 4
Output: "8"
Explanation: 4 and 8 are the only k-palindromic integers with 1 digit.
```

### Example 3

```text
Input: n = 5, k = 6
Output: "89898"
```

### Constraints

- `1 <= n <= 10⁵`
- `1 <= k <= 9`

## Hints

### Hint 1

It must have a solution since we can have all digits equal to k.

### Hint 2

Use string dp, store modulus along with length of number currently formed.

### Hint 3

Is it possible to solve greedily using divisibility rules?
