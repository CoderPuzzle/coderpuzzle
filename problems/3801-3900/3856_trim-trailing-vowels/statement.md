# Trim Trailing Vowels

## Description

You are given a string `s` that consists of lowercase English letters.

Return the string obtained by removing all trailing vowels from `s`.

The vowels consist of the characters `'a'`, `'e'`, `'i'`, `'o'`, and `'u'`.

### Example 1

```text
Input: s = "idea"
Output: "id"
Explanation:
Removing "idea", we obtain the string "id".
```

### Example 2

```text
Input: s = "day"
Output: "day"
Explanation:
There are no trailing vowels in the string "day".
```

### Example 3

```text
Input: s = "aeiou"
Output: ""
Explanation:
Removing "aeiou", we obtain the string "".
```

### Constraints

- `1 <= s.length <= 100`
- `s` consists of only lowercase English letters.

## Hints

### Hint 1

Simulate; pop the last character as long as it is a vowel.
