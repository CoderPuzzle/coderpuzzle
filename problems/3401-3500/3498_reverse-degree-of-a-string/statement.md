# Reverse Degree of a String

## Description

Given a string `s`, calculate its reverse degree.

The reverse degree is calculated as follows:

For each character, multiply its position in the reversed alphabet
(`'a' = 26`, `'b' = 25`, ..., `'z' = 1`) with its position in the string
(1-indexed). Sum these products for all characters in the string.

Return the reverse degree of `s`.

### Example 1

```text
Input: s = "abc"
Output: 148
Explanation: The reversed degree is 26 + 50 + 72 = 148.
```

### Example 2

```text
Input: s = "zaza"
Output: 160
Explanation: The reversed degree is 1 + 52 + 3 + 104 = 160.
```

### Constraints

- `1 <= s.length <= 1000`
- `s` contains only lowercase English letters.

## Hints

### Hint 1

Simulate the operations as described.
