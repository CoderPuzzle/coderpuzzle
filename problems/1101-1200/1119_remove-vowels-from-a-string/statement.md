# Remove Vowels from a String

## Description

Given a string `s`, remove the vowels `'a'`, `'e'`, `'i'`, `'o'`, and
`'u'` from it, and return the new string.

### Example 1

```text
Input: s = "leetcodeisacommunityforcoders"
Output: "ltcdscmmntyfrcdrs"
```

### Example 2

```text
Input: s = "aeiou"
Output: ""
```

### Constraints

- `1 <= s.length <= 1000`
- `s` consists of only lowercase English letters.

## Hints

### Hint 1

How to erase vowels in a string?

### Hint 2

Loop over the string and check every character; if it is a vowel ignore it,
otherwise add it to the answer.
