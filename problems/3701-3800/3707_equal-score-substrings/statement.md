# Equal Score Substrings

## Description

You are given a string s consisting of lowercase English letters.

The score of a string is the sum of the positions of its characters in the
alphabet — 'a' counts as 1, 'b' as 2, and so on up to 'z' as 26.

Determine whether there exists an index i such that s splits into two
non-empty substrings s[0..i] and s[(i + 1)..(n - 1)] whose scores are equal.
Return true if such a split exists, and false otherwise.

### Example 1

```text
Input: s = "adcb"
Output: true
Explanation: Split at index i = 1. The left substring s[0..1] = "ad" has
score 1 + 4 = 5, and the right substring s[2..3] = "cb" has score 3 + 2 = 5.
Both halves carry score 5, so the answer is true.
```

### Example 2

```text
Input: s = "bace"
Output: false
Explanation: No split produces two substrings with equal scores, so the
answer is false.
```

### Constraints

- `2 <= s.length <= 100`
- `s` consists of lowercase English letters.

## Hints

### Hint 1

Use brute-force.
