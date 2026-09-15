# Maximum Number of Occurrences of a Substring

## Description

Given a string `s`, return the maximum number of occurrences of any
substring under the following rules:

- The number of unique characters in the substring must be less than or
  equal to `maxLetters`.
- The substring size must be between `minSize` and `maxSize` inclusive.

### Example 1

```text
Input: s = "aababcaab", maxLetters = 2, minSize = 3, maxSize = 4
Output: 2
Explanation: Substring "aab" has 2 occurrences in the original string.
It satisfies the conditions, 2 unique letters and size 3 (between minSize and maxSize).
```

### Example 2

```text
Input: s = "aaaa", maxLetters = 1, minSize = 3, maxSize = 3
Output: 2
Explanation: Substring "aaa" occur 2 times in the string. It can overlap.
```

### Constraints

- `1 <= s.length <= 10^5`
- `1 <= maxLetters <= 26`
- `1 <= minSize <= maxSize <= min(26, s.length)`
- `s` consists of only lowercase English letters.

## Hints

### Hint 1

Check out the constraints, (maxSize <=26).

### Hint 2

This means you can explore all substrings in O(n * 26).

### Hint 3

Find the Maximum Number of Occurrences of a Substring with bruteforce.
