# Reverse Substrings Between Each Pair of Parentheses

## Description

You are given a string `s` that consists of lower case English letters
and brackets.

Reverse the strings in each pair of matching parentheses, starting from the
innermost one.

Your result should not contain any brackets.

### Example 1

```text
Input: s = "(abcd)"
Output: "dcba"
```

### Example 2

```text
Input: s = "(u(love)i)"
Output: "iloveu"
Explanation: The substring "love" is reversed first, then the whole string is reversed.
```

### Example 3

```text
Input: s = "(ed(et(oc))el)"
Output: "leetcode"
Explanation: First, we reverse the substring "oc", then "etco", and finally, the whole string.
```

### Constraints

- `1 <= s.length <= 2000`
- `s` only contains lower case English characters and parentheses.
- It is guaranteed that all parentheses are balanced.

## Hints

### Hint 1

Find all brackets in the string and think about how each matched pair bounds a substring to reverse.

### Hint 2

Does the order in which you process the pairs matter? It does not.

### Hint 3

A stack of string fragments handles the nesting: push on '(' and reverse-and-merge on ')'.
