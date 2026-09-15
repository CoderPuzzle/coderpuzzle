# Count Substrings That Differ by One Character

## Description

You are given two strings `s` and `t`. Count the pairs of non-empty,
equal-length substrings — one taken from `s`, one taken from `t` — whose
characters disagree at **exactly one** position.

Formally, count the triples `(i, j, len)` such that `1 <= len`, the
substring of `s` starting at index `i` with length `len` is entirely
inside `s`, the substring of `t` starting at index `j` with length `len`
is entirely inside `t`, and the two substrings differ at exactly one
character position.

A substring is a contiguous sequence of characters within a string.

### Example 1

```text
Input: s = "aba", t = "baba"
Output: 6
Explanation: Every qualifying pair here uses single-character substrings:
s[0:1]="a" against t[0:1]="b", s[0:1]="a" against t[2:3]="b",
s[1:2]="b" against t[1:2]="a", s[1:2]="b" against t[3:4]="a",
s[2:3]="a" against t[0:1]="b", and s[2:3]="a" against t[2:3]="b".
```

### Example 2

```text
Input: s = "ab", t = "bb"
Output: 3
Explanation: Two single-character pairs qualify — s[0:1]="a" against
t[0:1]="b" and against t[1:2]="b" — plus the length-2 pair s[0:2]="ab"
against t[0:2]="bb", which differs only in its first character.
```

### Constraints

- `1 <= s.length, t.length <= 100`
- `s` and `t` consist of lowercase English letters only.

## Hints

### Hint 1

For a fixed pair of starting indices `(i, j)`, walking `s` and `t` forward
character by character makes the running mismatch count monotonic — it
never decreases. That means the lengths with exactly one mismatch form a
contiguous range.

### Hint 2

Track, for every pair of _ending_ indices, the length of the run of exact
matches ending there and the length of the longest run ending there with
at most one mismatch. Their difference is the count you want to add for
that ending pair.
