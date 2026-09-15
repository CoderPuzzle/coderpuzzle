# Remove Zeros in Decimal Representation

## Description

You are given a positive integer `n`.

Return the integer that remains when every digit `0` is deleted from the
decimal representation of `n`. The surviving digits keep their relative
order and are read back together as one ordinary integer, so a run of
zeros anywhere in `n` simply disappears. The constraints guarantee at
least one nonzero digit, which means the answer is always a positive
integer — it can never come back empty.

### Example 1

```text
Input: n = 1020030
Output: 123
Explanation: Striking the three 0 digits from 1020030 leaves 1, 2, 3 in
order, which read back as 123.
```

### Example 2

```text
Input: n = 1
Output: 1
Explanation: 1 contains no zero digit at all, so nothing is removed and
the answer is 1 itself.
```

### Constraints

- `1 <= n <= 10¹⁵`

## Hints

### Hint 1

Convert to a string and filter out the '0' characters.
