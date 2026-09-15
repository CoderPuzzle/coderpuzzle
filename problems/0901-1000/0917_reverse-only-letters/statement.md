# Reverse Only Letters

## Description

Given a string `s`, reverse the string according to the following rules:

- All the characters that are not English letters remain in the same position.
- All the English letters (lowercase or uppercase) should be reversed.

Return `s` after reversing it.

### Example 1

```text
Input: s = "ab-cd"
Output: "dc-ba"
```

### Example 2

```text
Input: s = "a-bC-dEf-ghIj"
Output: "j-Ih-gfE-dCba"
```

### Example 3

```text
Input: s = "Test1ng-Leet=code-Q!"
Output: "Qedo1ct-eeLg=ntse-T!"
```

### Constraints

- `1 <= s.length <= 100`
- `s` consists of characters with ASCII values in the range `[33, 122]`.
- `s` does not contain `'"'` or `'\'`.

## Hints

### Hint 1

This is exactly like reversing a normal string, except that certain characters
have to be simply skipped. The two-pointer approach carries over — each pointer
steps past whatever is not an English letter.
