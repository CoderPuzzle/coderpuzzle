# Concatenated Words

## Description

Given an array of strings `words` (without duplicates), return all the
concatenated words in the given list of words.

A concatenated word is defined as a string that is comprised entirely of at
least two shorter words (not necessarily distinct) in the given array.

Return the concatenated words in the order they appear in `words`.

### Example 1

```text
Input: words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]
Output: ["catsdogcats","dogcatsdog","ratcatdogcat"]
Explanation: "catsdogcats" can be concatenated by "cats", "dog" and "cats";
"dogcatsdog" can be concatenated by "dog", "cats" and "dog";
"ratcatdogcat" can be concatenated by "rat", "cat", "dog" and "cat".
```

### Example 2

```text
Input: words = ["cat","dog","catdog"]
Output: ["catdog"]
```

### Constraints

- `1 <= words.length <= 10^4`
- `1 <= words[i].length <= 30`
- `words[i]` consists of only lowercase English letters.
- All the strings of `words` are unique.
- `1 <= sum(words[i].length) <= 10^5`

## Hints

### Hint 1

Test each word with a word-break style DP that asks whether the word splits into two or more dictionary words.

### Hint 2

Exclude the whole word itself when checking whether its full span splits into parts.

### Hint 3

Only strictly shorter words can be parts of a candidate, so skip longer words when testing it.
