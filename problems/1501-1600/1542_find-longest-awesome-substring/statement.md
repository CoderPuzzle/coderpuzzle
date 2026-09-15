# Find Longest Awesome Substring

## Description

You are given a string `s` consisting only of digits.

An **awesome substring** is a non-empty substring of `s` that can be
rearranged, by swapping its characters any number of times, into a
palindrome.

Return the length of the longest awesome substring of `s`.

### Example 1

```text
Input: s = "3242415"
Output: 5
Explanation: "24241" is the longest awesome substring; it can be
rearranged into the palindrome "24142".
```

### Example 2

```text
Input: s = "12345678"
Output: 1
```

### Example 3

```text
Input: s = "213123"
Output: 6
Explanation: "213123" is the longest awesome substring; it can be
rearranged into the palindrome "231132".
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s` consists only of digits.

## Hints

### Hint 1

Given the character counts of a substring, under what condition can they
be rearranged into a palindrome?

### Hint 2

Scan left to right and maintain, for each prefix, the parity (odd/even)
of how many times each digit has appeared so far, as a 10-bit mask
updated by `mask ^= (1 << digit)`.

### Hint 3

The expected complexity is `O(n * A)`, where `A` is the alphabet size
(10 digits).
