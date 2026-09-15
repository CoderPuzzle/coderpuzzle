# Number of Substrings With Only 1s

## Description

Given a binary string `s`, return the number of substrings that consist
only of `'1'` characters. Since the answer may be too large, return it
modulo `10⁹ + 7`.

### Example 1

```text
Input: s = "0110111"
Output: 9
Explanation: There are 9 substrings in total with only 1's characters.
"1" -> 5 times.
"11" -> 3 times.
"111" -> 1 time.
```

### Example 2

```text
Input: s = "101"
Output: 2
Explanation: The substring "1" appears 2 times in s.
```

### Example 3

```text
Input: s = "111111"
Output: 21
Explanation: Every substring contains only 1's characters.
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s[i]` is either `'0'` or `'1'`.

## Hints

### Hint 1

Count the number of 1s in each consecutive run of 1s. For a run of length
`n`, the total number of all-1s substrings it contributes is
`(n + 1) * n / 2`.
