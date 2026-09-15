# Distinct Echo Substrings

## Description

Return the number of distinct non-empty substrings of `text` that can be
written as the concatenation of some string with itself (i.e. it can be
written as `a + a` where `a` is some string).

### Example 1

```text
Input: text = "abcabcabc"
Output: 3
Explanation: The 3 substrings are "abcabc", "bcabca" and "cabcab".
```

### Example 2

```text
Input: text = "leetcodeleetcode"
Output: 2
Explanation: The 2 substrings are "ee" and "leetcodeleetcode".
```

### Constraints

- `1 <= text.length <= 2000`
- `text` has only lowercase English letters.

## Hints

### Hint 1

Given a substring of the text, how would you check whether it can be written as the concatenation of a string with itself?

### Hint 2

The check can be done in linear time by comparing the two halves; a faster way is to use hashing.

### Hint 3

Try all substrings and use hashing (with a set to deduplicate) to count the distinct echoes.
