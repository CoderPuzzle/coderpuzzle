# Smallest Good Base

## Description

Given an integer `n` represented as a string, return the smallest good base of
`n`.

We call `k >= 2` a good base of `n`, if all digits of `n` base `k` are 1's.

### Example 1

```text
Input: n = "13"
Output: "3"
Explanation: 13 base 3 is 111.
```

### Example 2

```text
Input: n = "4681"
Output: "8"
Explanation: 4681 base 8 is 11111.
```

### Example 3

```text
Input: n = "1000000000000000000"
Output: "999999999999999999"
Explanation: 1000000000000000000 base 999999999999999999 is 11.
```

### Constraints

- `n` is an integer in the range `[3, 10¹⁸]`.
- `n` does not contain any leading zeros.
