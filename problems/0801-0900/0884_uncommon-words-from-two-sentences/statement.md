# Uncommon Words from Two Sentences

## Description

A sentence is a string of single-space separated words where each word
consists only of lowercase letters.

A word is **uncommon** if it appears exactly once in one of the sentences,
and does not appear in the other sentence.

Given two sentences `s1` and `s2`, return a list of all the uncommon words.

The list carries one fixed order: the uncommon words of `s1` first, each in
the order it first appears in `s1`, followed by the uncommon words of `s2`,
each in the order it first appears in `s2`. An uncommon word occurs in
exactly one of the sentences, so no word is ever listed twice.

### Example 1

```text
Input: s1 = "this apple is sweet", s2 = "this apple is sour"
Output: ["sweet","sour"]
Explanation: "sweet" appears only in s1, while "sour" appears only in s2, so
s1's uncommon word is listed before s2's.
```

### Example 2

```text
Input: s1 = "apple apple", s2 = "banana"
Output: ["banana"]
Explanation: "apple" appears twice in s1, so it does not appear exactly once
in either sentence; "banana" appears once in s2 and never in s1.
```

### Constraints

- `1 <= s1.length, s2.length <= 200`
- `s1` and `s2` consist of lowercase English letters and spaces.
- `s1` and `s2` do not have leading or trailing spaces.
- All the words in `s1` and `s2` are separated by a single space.
