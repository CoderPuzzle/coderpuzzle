# Longest Balanced Substring II

## Description

You are given a string `s` made up only of the characters `'a'`, `'b'`, and
`'c'`.

A substring of `s` is called **balanced** when every distinct character that
occurs in it occurs the same number of times. For example, `"abba"` is
balanced because both of its distinct characters appear exactly twice,
`"ccc"` is balanced because its single distinct character appears three
times, and `"aab"` is not balanced.

Return the length of the longest balanced substring of `s`.

### Example 1

```text
Input: s = "abbac"
Output: 4
Explanation: "abba" is the longest balanced substring — its distinct
characters 'a' and 'b' each appear exactly 2 times.
```

### Example 2

```text
Input: s = "aabcc"
Output: 3
Explanation: "abc" is the longest balanced substring — all three distinct
characters each appear exactly 1 time.
```

### Example 3

```text
Input: s = "aba"
Output: 2
Explanation: "ab" is one longest balanced substring ('a' and 'b' each appear
exactly 1 time); "ba" is another.
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s` consists only of the characters `'a'`, `'b'`, and `'c'`.

## Hints

### Hint 1

Handle three cases separately — substrings with one distinct character, with
exactly two, and with all three — and return the largest length found.

### Hint 2

One distinct character: a balanced substring is just a run of one repeated
letter, so this case's answer is the longest run of equal characters in `s`.

### Hint 3

Exactly two distinct characters: pick a pair and ignore the third letter,
walking what remains while keeping the running difference of the pair's
counts. Two positions holding the same difference enclose a stretch where
the pair is balanced; remembering the earliest position of each difference
value maximizes the length.

### Hint 4

All three characters: keep running counts of the letters and hash each
prefix's pair `(count_b - count_a, count_c - count_a)`. When the same pair
shows up twice, the stretch between those prefixes has equal counts of `a`,
`b`, and `c`; storing the earliest index per pair yields the maximal length.
