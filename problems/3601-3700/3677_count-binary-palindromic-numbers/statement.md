# Count Binary Palindromic Numbers

## Description

You are given a non-negative integer `n`.

An integer is binary-palindromic when its binary representation, written
without leading zeros, reads the same forwards and backwards. Zero counts as
binary-palindromic; its representation is "0".

Return how many integers `k` with `0 <= k <= n` are binary-palindromic.

### Example 1

```text
Input: n = 9
Output: 6
Explanation: The values in [0, 9] whose binary representations read the same
in both directions are 0 ("0"), 1 ("1"), 3 ("11"), 5 ("101"), 7 ("111") and
9 ("1001"). Every other value in the range fails the test, so the answer is 6.
```

### Example 2

```text
Input: n = 0
Output: 1
Explanation: "0" is itself a palindrome, so the count is 1.
```

### Constraints

- `0 <= n <= 10¹⁵`

## Hints

### Hint 1

Think in terms of the length of the binary representation rather than testing
every number in the range one by one.

### Hint 2

How many binary palindromes of a given length exist? Only the first half of
the representation determines the whole value.

### Hint 3

Every palindrome strictly shorter than `n` can be pre-counted directly with
powers of two.

### Hint 4

For palindromes with exactly the length of `n`, extract the prefix of `n`,
mirror it, and check whether the result exceeds `n`.
