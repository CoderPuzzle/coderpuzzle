# Largest Odd Number in String

## Description

You are given a string `num`, representing a large integer.

Return the largest-valued odd integer (as a string) that is a non-empty
substring of `num`, or an empty string `""` if no odd integer exists.

A substring is a contiguous sequence of characters within a string.

### Example 1

```text
Input: num = "52"
Output: "5"
Explanation: The only non-empty substrings are "5", "2", and "52". "5" is
the only odd number.
```

### Example 2

```text
Input: num = "4206"
Output: ""
Explanation: There are no odd numbers in "4206".
```

### Example 3

```text
Input: num = "35427"
Output: "35427"
Explanation: "35427" is already an odd number.
```

### Constraints

- `1 <= num.length <= 10⁵`
- `num` only consists of digits and does not contain any leading zeros.

## Hints

### Hint 1

In what order should you iterate through the digits?

### Hint 2

If an odd number exists, where must the number start from?
