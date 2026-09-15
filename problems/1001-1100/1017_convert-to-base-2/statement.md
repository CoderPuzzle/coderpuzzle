# Convert to Base -2

## Description

Given an integer `n`, return a binary string representing its
representation in base -2.

Note that the returned string should not have leading zeros unless the
string is `"0"`.

### Example 1

```text
Input: n = 2
Output: "110"
Explanation: (-2)^2 + (-2)^1 = 2
```

### Example 2

```text
Input: n = 3
Output: "111"
Explanation: (-2)^2 + (-2)^1 + (-2)^0 = 3
```

### Example 3

```text
Input: n = 4
Output: "100"
Explanation: (-2)^2 = 4
```

### Constraints

- `0 <= n <= 10^9`

## Hints

### Hint 1

Figure out whether you need the ones digit placed or not, then shift by
two.
