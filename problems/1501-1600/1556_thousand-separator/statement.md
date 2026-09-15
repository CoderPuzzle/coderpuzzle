# Thousand Separator

## Description

Given an integer `n`, insert a dot (`.`) as the thousands separator and
return the result as a string.

### Example 1

```text
Input: n = 987
Output: "987"
```

### Example 2

```text
Input: n = 1234
Output: "1.234"
```

### Constraints

- `0 <= n <= 2³¹ - 1`

## Hints

### Hint 1

Scan from the back of the number and connect blocks of length 3 with dots,
except the last (leading) block.
