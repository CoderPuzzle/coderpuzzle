# Consecutive Characters

## Description

The power of the string is the maximum length of a non-empty substring
that contains only one unique character.

Given a string `s`, return the power of `s`.

### Example 1

```text
Input: s = "leetcode"
Output: 2
Explanation: The substring "ee" is of length 2 with the character 'e'
only.
```

### Example 2

```text
Input: s = "abbcccddddeeeeedcba"
Output: 5
Explanation: The substring "eeeee" is of length 5 with the character 'e'
only.
```

### Constraints

- `1 <= s.length <= 500`
- `s` consists of only lowercase English letters.

## Hints

### Hint 1

Keep an array `power` where `power[i]` is the maximum power of the i-th
character.

### Hint 2

The answer is `max(power[i])`.
