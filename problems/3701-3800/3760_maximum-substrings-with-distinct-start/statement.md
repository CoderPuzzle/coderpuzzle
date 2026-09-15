# Maximum Substrings With Distinct Start

## Description

You are given a string s consisting of lowercase English letters.

Split s into one or more contiguous substrings, and consider the first
character of each piece. The split is called distinct-start when no two
pieces start with the same character — across the whole split, every piece's
first character is unique.

Return the maximum number of pieces such a split can have.

### Example 1

```text
Input: s = "abab"
Output: 2
Explanation: Split "abab" into "a" and "bab". The pieces start with 'a' and
'b', which are distinct, so two pieces are possible. A three-piece split is
impossible because only two different characters exist to start a piece.
```

### Example 2

```text
Input: s = "abcd"
Output: 4
Explanation: Split "abcd" into "a", "b", "c", and "d". Each piece starts
with a different character, so all four single-letter pieces can coexist.
```

### Example 3

```text
Input: s = "aaaa"
Output: 1
Explanation: Every piece would start with 'a', and a character may start at
most one piece. The whole string therefore has to stay in a single piece.
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s` consists of lowercase English letters.
- All characters are ASCII lowercase letters `'a'` through `'z'`.

## Hints

### Hint 1

Each distinct character can be the first character of at most one piece, so
the answer can never exceed the number of distinct characters in s.

### Hint 2

That bound is always reachable: scanning left to right and cutting a new
piece exactly when the current letter has not started any piece yet turns
every distinct character into the start of some piece.
