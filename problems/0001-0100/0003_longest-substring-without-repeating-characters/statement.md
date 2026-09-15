# Longest Substring Without Repeating Characters

## Description

Given a string `s`, find the length of the longest substring without
duplicate characters.

### Example 1

```text
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.
```

### Example 2

```text
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```

### Example 3

```text
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
```

### Constraints

- `0 <= s.length <= 5 * 10^4`
- `s` consists of English letters, digits, symbols and spaces.

## Hints

### Hint 1

Slide a window over the string and keep the index of the last occurrence of each character.

### Hint 2

When a repeated character enters the window, move the window start past its previous occurrence.

### Hint 3

The answer is the largest window size seen; there are fewer than 128 distinct ASCII characters, so the map stays tiny.
