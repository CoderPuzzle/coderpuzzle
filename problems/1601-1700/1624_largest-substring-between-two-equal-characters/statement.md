# Largest Substring Between Two Equal Characters

## Description

Given a string `s`, return the length of the longest substring between two
equal characters, excluding the two characters themselves. If no character
appears more than once in `s`, return `-1`.

A substring is a contiguous sequence of characters within a string.

### Example 1

```text
Input: s = "aa"
Output: 0
Explanation: The optimal substring here is an empty substring between the
two 'a's.
```

### Example 2

```text
Input: s = "abca"
Output: 2
Explanation: The optimal substring here is "bc".
```

### Example 3

```text
Input: s = "cbzxy"
Output: -1
Explanation: There are no characters that appear twice in s.
```

### Constraints

- `1 <= s.length <= 300`
- `s` contains only lowercase English letters.

## Hints

### Hint 1

Try saving the first and last position of each character.

### Hint 2

Try finding every pair of indexes with equal characters.
