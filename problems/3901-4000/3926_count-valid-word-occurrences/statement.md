# Count Valid Word Occurrences

## Description

You are given an array of strings `chunks`. Concatenate all strings in
`chunks` in order to form a string `s`.

You are also given an array of strings `queries`.

A joiner hyphen is a hyphen character `'-'` in `s` whose previous and next
characters both exist and are lowercase English letters.

A word is a maximal substring of `s` consisting only of lowercase English
letters and joiner hyphens.

All other characters, including spaces and hyphens that are not joiner
hyphens, are treated as separators.

Return an integer array `ans`, where `ans[i]` is the number of times
`queries[i]` appears as a word in `s`.

### Example 1

```text
Input: chunks = ["hello wor","ld hello"], queries = ["hello","world","wor"]
Output: [2,1,0]
Explanation:
    After concatenating all strings in chunks, s = "hello world hello".
    The words are "hello", "world", and "hello".
    The substring "wor" appears inside "world", but it is not a full word.
```

### Example 2

```text
Input: chunks = ["a-b a--b ","a-","b"], queries = ["a-b","a","b"]
Output: [2,1,1]
Explanation:
    After concatenating all strings in chunks, s = "a-b a--b a-b".
    In "a-b", the hyphen is a joiner hyphen because it is between two
    lowercase English letters, so "a-b" is one word.
    In "a--b", neither hyphen is a joiner hyphen, so it is split into the
    words "a" and "b".
    Therefore, the words are "a-b", "a", "b", and "a-b".
```

### Example 3

```text
Input: chunks = ["-cat dog- mouse"], queries = ["cat","dog","mouse","cat-dog"]
Output: [1,1,1,0]
Explanation:
    After concatenating all strings in chunks, s = "-cat dog- mouse".
    The leading hyphen before "cat" and the trailing hyphen after "dog" are
    not joiner hyphens, so they are separators.
    The words are "cat", "dog", and "mouse".
```

### Constraints

- `1 <= chunks.length <= 10⁵`
- `1 <= chunks[i].length <= 10⁵`
- The total length of all strings in `chunks` does not exceed `10⁵`
- `chunks[i]` consists only of lowercase English letters, spaces, and `'-'`
- `1 <= queries.length <= 10⁵`
- `1 <= queries[i].length <= 10⁵`
- The total length of all strings in `queries` does not exceed `10⁵`
- `queries[i]` consists only of lowercase English letters and `'-'`
- `queries[i]` is a valid word: it does not start or end with `'-'`, and it
  does not contain two consecutive hyphens

## Hints

### Hint 1

Identify which hyphens can stay inside words before splitting.
