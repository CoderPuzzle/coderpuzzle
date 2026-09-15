# Find Common Characters

## Description

Given a string array `words`, return an array of all characters that show
up in all strings within the `words` (including duplicates).

On LeetCode the result may come back in any order; here the judge compares
arrays exactly, so that freedom is pinned to one order — return the
characters in ascending alphabetical order, each character appearing as
many times as its minimum count across every string in `words`.

### Example 1

```text
Input: words = ["bella","label","roller"]
Output: ["e","l","l"]
```

### Example 2

```text
Input: words = ["cool","lock","cook"]
Output: ["c","o"]
```

### Constraints

- `1 <= words.length <= 100`
- `1 <= words[i].length <= 100`
- `words[i]` consists of lowercase English letters.
