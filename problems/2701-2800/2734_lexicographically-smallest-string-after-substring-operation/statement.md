# Lexicographically Smallest String After Substring Operation

## Description

Given a string `s` consisting of lowercase English letters. Perform the
following operation:

- Select any non-empty substring then replace every letter of the substring
  with the preceding letter of the English alphabet. For example, 'b' is
  converted to 'a', and 'a' is converted to 'z'.

Return the lexicographically smallest string after performing the operation.

### Example 1

```text
Input: s = "cbabc"
Output: "baabc"
Explanation: Perform the operation on the substring starting at index 0, and ending at index 1 inclusive.
```

### Example 2

```text
Input: s = "aa"
Output: "az"
Explanation: Perform the operation on the last letter.
```

### Example 3

```text
Input: s = "acbbc"
Output: "abaab"
Explanation: Perform the operation on the substring starting at index 1, and ending at index 4 inclusive.
```

### Example 4

```text
Input: s = "leetcode"
Output: "kddsbncd"
Explanation: Perform the operation on the entire string.
```

### Constraints

- `1 <= s.length <= 3 * 10⁵`
- `s` consists of lowercase English letters.

## Hints

### Hint 1

When a character is replaced by the one that comes before it on the
alphabet, it makes the string lexicographically smaller, except for ‘a'.

### Hint 2

Find the leftmost substring that doesn’t contain the character 'a' and
change all characters in it.
