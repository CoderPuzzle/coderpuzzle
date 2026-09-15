# Second Largest Digit in a String

## Description

Given an alphanumeric string `s`, return the second largest numerical
digit that appears in `s`, or `-1` if it does not exist.

An alphanumeric string is a string consisting of lowercase English
letters and digits.

### Example 1

```text
Input: s = "dfa12321afd"
Output: 2
Explanation: The digits that appear in s are [1, 2, 3]. The second largest
digit is 2.
```

### Example 2

```text
Input: s = "abc1111"
Output: -1
Explanation: The digits that appear in s are [1]. There is no second
largest digit.
```

### Constraints

- `1 <= s.length <= 500`
- `s` consists of only lowercase English letters and digits.

## Hints

### Hint 1

First of all, get the distinct characters since we are only interested
in those

### Hint 2

Let's note that there might not be any digits.
