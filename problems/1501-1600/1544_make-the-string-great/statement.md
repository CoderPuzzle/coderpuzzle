# Make The String Great

## Description

You are given a string `s` made up of lower-case and upper-case English
letters.

A string is **good** if it does not contain two adjacent characters
`s[i]` and `s[i + 1]` such that `0 <= i <= s.length - 2` and `s[i]` is the
same letter as `s[i + 1]`, one lower-case and the other upper-case (or the
other way around).

To make the string good, repeatedly pick two adjacent characters that
violate this rule and remove them, continuing until no such pair remains.

Return the string that results. The answer is guaranteed to be unique
regardless of the order in which pairs are removed.

An empty string counts as good.

### Example 1

```text
Input: s = "leEeetcode"
Output: "leetcode"
Explanation: Removing either "Ee" or "eE" first, the string reduces to
"leetcode" either way.
```

### Example 2

```text
Input: s = "abBAcC"
Output: ""
Explanation: Every character can be paired off and removed, for example:
"abBAcC" -> "aAcC" -> "cC" -> ""
"abBAcC" -> "abBA" -> "aA" -> ""
```

### Example 3

```text
Input: s = "s"
Output: "s"
```

### Constraints

- `1 <= s.length <= 100`
- `s` contains only lower-case and upper-case English letters.

## Hints

### Hint 1

The order in which you choose the two characters to remove doesn't matter.

### Hint 2

Keep applying the removal step to `s` until the string's length stops
changing.
