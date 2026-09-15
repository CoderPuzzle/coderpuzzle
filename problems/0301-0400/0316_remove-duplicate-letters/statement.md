# Remove Duplicate Letters

## Description

Given a string `s`, remove duplicate letters so that every letter appears
once and only once. You must make sure your result is the smallest in
lexicographical order among all possible results.

### Example 1

```text
Input: s = "bcabc"
Output: "abc"
```

### Example 2

```text
Input: s = "cbacdcbc"
Output: "acdb"
```

### Constraints

- `1 <= s.length <= 10^4`
- `s` consists of lowercase English letters.

## Hints

### Hint 1

Greedily try to add one missing character. How to check if adding some character will not cause problems? Use bit-masks to check whether you will be able to complete the sub-sequence if you add the character at some index i.

### Hint 2

Equivalently, build the answer on a stack: while the top of the stack is larger than the current character and that top character still occurs later in s, pop it.

### Hint 3

Keep a count of each letter's remaining occurrences and a set of letters already placed, and never push a letter that is already in the stack.
