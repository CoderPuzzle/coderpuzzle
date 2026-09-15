# Minimum Length of String After Operations

## Description

You are given a string `s`.

You can perform the following process on `s` any number of times:

- Choose an index `i` in the string such that there is at least one
  character to the left of index `i` that is equal to `s[i]`, and at least
  one character to the right that is also equal to `s[i]`.
- Delete the closest occurrence of `s[i]` located to the left of `i`.
- Delete the closest occurrence of `s[i]` located to the right of `i`.

Return the minimum length of the final string `s` that you can achieve.

### Example 1

```text
Input: s = "abaacbcbb"
Output: 5
Explanation: We do the following operations:
- Choose index 2, then remove the characters at indices 0 and 3. The resulting string is s = "bacbcbb".
- Choose index 3, then remove the characters at indices 0 and 5. The resulting string is s = "acbcb".
```

### Example 2

```text
Input: s = "aa"
Output: 2
Explanation: We cannot perform any operations, so we return the length of
the original string.
```

### Constraints

- `1 <= s.length <= 2 * 10⁵`
- `s` consists only of lowercase English letters.

## Hints

### Hint 1

Only the frequency of each character matters in finding the final answer.

### Hint 2

If a character occurs less than 3 times, we cannot perform any process with it.

### Hint 3

Suppose there is a character that occurs at least 3 times in the string, we can repeatedly delete two of these characters until there are at most 2 occurrences left of it.
