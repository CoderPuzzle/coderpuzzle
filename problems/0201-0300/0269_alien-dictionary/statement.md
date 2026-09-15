# Alien Dictionary

## Description

There is a new alien language that uses the English alphabet. However,
the order of the letters is unknown to you.

You are given a list of strings `words` from the alien language's dictionary.
Now it is claimed that the strings in `words` are sorted lexicographically by
the rules of this new language.

If this claim is incorrect, and the given arrangement of strings in `words`
cannot correspond to any order of letters, return `""`.

Otherwise, return a string of the unique letters in the new alien language
sorted in lexicographically increasing order by the new language's rules. If
there are multiple solutions, return the lexicographically smallest one.

### Example 1

```text
Input: words = ["wrt","wrf","er","ett","rftt"]
Output: "wertf"
```

### Example 2

```text
Input: words = ["z","x"]
Output: "zx"
```

### Example 3

```text
Input: words = ["z","x","z"]
Output: ""
Explanation: The order is invalid, so return "".
```

### Constraints

- `1 <= words.length <= 100`
- `1 <= words[i].length <= 100`
- `words[i]` consists of only lowercase English letters.

## Hints

### Hint 1

Two adjacent words fix the relative order of the first pair of letters at which they differ; collect exactly one such edge per adjacent pair.

### Hint 2

If a longer word comes before its own prefix, the claimed order is impossible and the answer is the empty string.

### Hint 3

The letters and edges form a directed graph; produce a topological order of it, returning the empty string when a cycle exists.

### Hint 4

To emit the lexicographically smallest valid order, repeatedly pick the alphabetically smallest letter whose prerequisites are all satisfied (a min-heap over in-degrees).
