# Longest Substring with At Least K Repeating Characters

## Description

Given a string `s` and an integer `k`, return the length of the longest
substring of `s` such that the frequency of each character in this substring
is greater than or equal to `k`.

If no such substring exists, return `0`.

### Example 1

```text
Input: s = "aaabb", k = 3
Output: 3
Explanation: The longest substring is "aaa", as 'a' is repeated 3 times.
```

### Example 2

```text
Input: s = "ababbc", k = 2
Output: 5
Explanation: The longest substring is "ababb", as 'a' is repeated 2 times and
'b' is repeated 3 times.
```

### Constraints

- `1 <= s.length <= 10^4`
- `s` consists of only lowercase English letters.
- `1 <= k <= 10^5`

## Hints

### Hint 1

Any character whose total count inside the current window is less than k can never appear in a valid answer, so it acts as a splitter.

### Hint 2

Recurse: count characters, find a rare one, split the string on every occurrence of it, and solve each piece independently.

### Hint 3

The recursion depth is at most 26 because each level removes at least one character from the alphabet of the pieces.
