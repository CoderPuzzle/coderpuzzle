# Maximum Length Substring With Two Occurrences

## Description

Given a string s, return the maximum length of a substring such that it
contains at most two occurrences of each character.

### Example 1

```text
Input: s = "bcbbbcba"
Output: 4
Explanation: The following substring has a length of 4 and contains at most
two occurrences of each character: "bcbbbcba".
```

### Example 2

```text
Input: s = "aaaa"
Output: 2
Explanation: The following substring has a length of 2 and contains at most
two occurrences of each character: "aaaa".
```

### Constraints

- `2 <= s.length <= 100`
- `s` consists only of lowercase English letters.

## Hints

### Hint 1

We can try all substrings by brute-force since the constraints are very small.
