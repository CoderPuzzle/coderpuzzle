# Number of Ways to Split a String

## Description

Given a binary string `s`, you can split `s` into 3 non-empty strings
`s1`, `s2`, and `s3` where `s1 + s2 + s3 = s`.

Return the number of ways `s` can be split such that the number of
characters `'1'` is the same in `s1`, `s2`, and `s3`. Since the answer
may be too large, return it modulo `10⁹ + 7`.

### Example 1

```text
Input: s = "10101"
Output: 4
Explanation: There are four ways to split s into 3 parts where each
part contains the same number of characters '1'.
"1|010|1"
"1|01|01"
"10|10|1"
"10|1|01"
```

### Example 2

```text
Input: s = "1001"
Output: 0
```

### Example 3

```text
Input: s = "0000"
Output: 3
Explanation: There are three ways to split s into 3 parts.
"0|0|00"
"0|00|0"
"00|0|0"
```

### Constraints

- `3 <= s.length <= 10⁵`
- `s[i]` is either `'0'` or `'1'`.

## Hints

### Hint 1

There is no way to split if the total number of `'1'` characters is not
divisible by the number of parts. So `total % 3` must equal `0`.

### Hint 2

`s1` (the prefix) and `s3` (the suffix) should each contain exactly
`total / 3` characters `'1'`.
