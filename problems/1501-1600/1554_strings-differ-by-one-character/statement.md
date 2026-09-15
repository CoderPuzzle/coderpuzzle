# Strings Differ by One Character

## Description

You are given a list of strings `words`, where every string has the same
length.

Return `true` if there exist two strings in `words` that differ in
**exactly one** character position, and `false` otherwise.

### Example 1

```text
Input: words = ["abcd","acbd","aacd"]
Output: true
Explanation: "abcd" and "aacd" differ in exactly one position, index 1
('b' vs 'a').
```

### Example 2

```text
Input: words = ["ab","cd","yz"]
Output: false
```

### Example 3

```text
Input: words = ["abcd","cccc","abyd","abab"]
Output: true
Explanation: "abcd" and "abyd" differ in exactly one position, index 2
('c' vs 'y').
```

### Constraints

- The total number of characters across all strings in `words` does not
  exceed `10⁵`.
- Every string in `words` has the same length.
- Every string in `words` is unique.
- Each string in `words` consists only of lowercase English letters.

## Hints

### Hint 1

Checking every pair directly costs `O(n² · m)`, where `n` is the number of
words and `m` is their shared length. Can you avoid comparing every pair?

### Hint 2

For each character position, group the words by what they look like with
that position masked out (replaced by a wildcard). Two words that land in
the same group agree everywhere except, at most, that one position.
