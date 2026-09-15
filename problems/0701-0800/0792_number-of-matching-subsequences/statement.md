# Number of Matching Subsequences

## Description

Given a string `s` and an array of strings `words`, return the number of
`words[i]` that is a subsequence of `s`.

A subsequence of a string is a new string generated from the original string
with some characters (can be none) deleted without changing the relative order
of the remaining characters.

- For example, `"ace"` is a subsequence of `"abcde"`.

### Example 1

```text
Input: s = "abcde", words = ["a","bb","acd","ace"]
Output: 3
Explanation: There are three strings in words that are a subsequence of s: "a", "acd", "ace".
```

### Example 2

```text
Input: s = "dsahjpjauf", words = ["ahjpjau","ja","ahbwzgqnuk","tnmlanowax"]
Output: 2
```

### Constraints

- `1 <= s.length <= 5 * 10^4`
- `1 <= words.length <= 5000`
- `1 <= words[i].length <= 50`
- `s` and `words[i]` consist of only lowercase English letters.

## Hints

### Hint 1

Do not rescan all of s for every word; process s once and let the words advance through it.

### Hint 2

Keep a bucket per letter holding the words (as iterators) currently waiting for that letter, and advance them as you stream s.

### Hint 3

Alternatively, store the sorted positions of each letter of s and jump to the next occurrence with binary search.
