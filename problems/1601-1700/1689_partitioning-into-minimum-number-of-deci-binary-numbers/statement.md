# Partitioning Into Minimum Number Of Deci-Binary Numbers

## Description

A decimal number is called deci-binary if each of its digits is either 0 or
1, without any leading zeros. For example, `101` and `1100` are deci-binary,
while `112` and `3001` are not.

Given a string `n` that represents a positive decimal integer, return the
minimum number of positive deci-binary numbers needed so that they sum up to
`n`.

### Example 1

```text
Input: n = "32"
Output: 3
Explanation: 10 + 11 + 11 = 32
```

### Example 2

```text
Input: n = "82734"
Output: 8
```

### Example 3

```text
Input: n = "27346209830709182346"
Output: 9
```

### Constraints

- `1 <= n.length <= 10⁵`
- `n` consists of only digits.
- `n` does not contain any leading zeros and represents a positive integer.

## Hints

### Hint 1

Think about if the input was only one digit. Then you need to add up as many
ones as the value of this digit.

### Hint 2

If the input has multiple digits, you can solve each digit independently and
merge the answers to form numbers that add up to that input.

### Hint 3

The answer is equal to the max digit.
