# String Matching in an Array

## Description

Given an array of string `words`, return all strings in `words` that is a
substring of another word. You can return the answer in any order.

A substring is a contiguous sequence of characters within a string. Only
a string that appears inside a _different_ word of the array counts; a
word is never its own witness.

### Example 1

```text
Input: words = ["mass","as","hero","superhero"]
Output: ["as","hero"]
Explanation: "as" is substring of "mass" and "hero" is substring of
"superhero". ["hero","as"] is also a valid answer.
```

### Example 2

```text
Input: words = ["leetcode","et","code"]
Output: ["et","code"]
Explanation: "et" and "code" are substrings of "leetcode".
```

### Example 3

```text
Input: words = ["blue","green","bu"]
Output: []
Explanation: No string of `words` is substring of another string.
```

### Constraints

- `1 <= words.length <= 100`
- `1 <= words[i].length <= 30`
- `words[i]` contains only lowercase English letters.
- All the strings of `words` are unique.

## Hints

### Hint 1

Bruteforce to find if one string is substring of another — the array has
at most 100 words of length at most 30, so trying every pair is cheap.
