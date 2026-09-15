# Minimum Number of Flips to Reverse Binary String

## Description

You are given a positive integer `n`. Let `s` be the binary representation of
`n` without leading zeros.

The reverse of a binary string is obtained by writing its characters in the
opposite order. You may flip any bit of `s`, changing a `0` into a `1` or a
`1` into a `0`; each flip affects exactly one bit.

Return the minimum number of flips required to make `s` equal to the reverse
of its original form.

### Example 1

```text
Input: n = 7
Output: 0
Explanation: The binary representation of 7 is "111". Its reverse is also
"111", which is the same string, so no flips are needed.
```

### Example 2

```text
Input: n = 10
Output: 4
Explanation: The binary representation of 10 is "1010". Its reverse is
"0101". Each of the four bits differs from the bit it must become, so all
four bits are flipped.
```

### Constraints

- `1 <= n <= 10^9`

## Hints

### Hint 1

Generate the reverse of the binary string and use two pointers from the ends to determine where flips are needed.
