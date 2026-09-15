# Index Pairs of a String

## Description

Given a string text and an array of strings words, return an array of
all index pairs `[i, j]` so that the substring `text[i...j]` is in
words.

Return the pairs `[i, j]` in sorted order (i.e., sort them by their
first coordinate, and in case of ties sort them by their second
coordinate).

### Example 1

```text
Input: text = "thestoryofleetcodeandme", words = ["story","fleet","leetcode"]
Output: [[3,7],[9,13],[10,17]]
```

### Example 2

```text
Input: text = "ababa", words = ["aba","ab"]
Output: [[0,1],[0,2],[2,3],[2,4]]
Explanation: Notice that matches can overlap, see "aba" is found in [0,2] and [2,4].
```

### Constraints

- `1 <= text.length <= 100`
- `1 <= words.length <= 20`
- `1 <= words[i].length <= 50`
- `text` and `words[i]` consist of lowercase English letters.
- All the strings of `words` are unique.

## Hints

### Hint 1

For each string of the set, look for matches and store those matches
indices.
