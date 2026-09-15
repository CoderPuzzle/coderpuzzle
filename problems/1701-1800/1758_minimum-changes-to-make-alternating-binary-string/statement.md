# Minimum Changes To Make Alternating Binary String

## Description

You are given a string `s` consisting only of the characters `'0'` and
`'1'`. In one operation, you can change any `'0'` to `'1'` or vice
versa.

The string is called alternating if no two adjacent characters are
equal. For example, the string `"010"` is alternating, while the string
`"0100"` is not.

Return the minimum number of operations needed to make `s` alternating.

### Example 1

```text
Input: s = "0100"
Output: 1
Explanation: If you change the last character to '1', s will be
"0101", which is alternating.
```

### Example 2

```text
Input: s = "10"
Output: 0
Explanation: s is already alternating.
```

### Example 3

```text
Input: s = "1111"
Output: 2
Explanation: You need two operations to reach "0101" or "1010".
```

### Constraints

- `1 <= s.length <= 10^4`
- `s[i]` is either '0' or '1'.

## Hints

### Hint 1

Think about how the final string will look like.

### Hint 2

It will either start with a '0' and be like '010101010..' or with a
'1' and be like '10101010..'.

### Hint 3

Try both ways, and check for each way, the number of changes needed to
reach it from the given string. The answer is the minimum of both
ways.
