# Next Special Palindrome Number

## Description

You are given a non-negative integer `n`.

An integer is called **special** when it is a palindrome — it reads the same
backward as forward — and every digit it contains occurs exactly as many times
as its own value: each `2` comes in a pair, each `3` in threes, and so on for
every digit present.

Return the smallest special integer that is strictly greater than `n`.

### Example 1

```text
Input: n = 2
Output: 22
Explanation: 22 is a palindrome whose digit 2 occurs exactly twice, and no
special integer lies strictly between 2 and 22.
```

### Example 2

```text
Input: n = 33
Output: 212
Explanation: 212 has one 1 and two 2s and reads the same in both directions,
and no special integer lies strictly between 33 and 212.
```

### Example 3

```text
Input: n = 22
Output: 212
Explanation: 22 itself is special, but the answer must be strictly greater
than `n`, so the next special integer is returned.
```

### Constraints

- `0 <= n <= 10¹⁵`

## Hints

### Hint 1

There are only a few special numbers; preprocess them.

### Hint 2

Use bitmasking to brute-force all valid selections of digits k for the
number.

### Hint 3

Generate all permutations of the first half of the digits, then mirror them
to form the full palindrome.

### Hint 4

For each n, use binary search to find the smallest special number strictly
greater than n.
