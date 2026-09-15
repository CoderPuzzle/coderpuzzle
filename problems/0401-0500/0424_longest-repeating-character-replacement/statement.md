# Longest Repeating Character Replacement

## Description

You are given a string `s` and an integer `k`. You can choose any character of
the string and change it to any other uppercase English character. You can
perform this operation at most `k` times.

Return the length of the longest substring containing the same letter you can
get after performing the above operations.

### Example 1

```text
Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.
```

### Example 2

```text
Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
There may exist other ways to achieve this answer too.
```

### Constraints

- `1 <= s.length <= 10^5`
- `s` consists of only uppercase English letters.
- `0 <= k <= s.length`

## Hints

### Hint 1

A window can be made uniform when (window length) - (count of its most frequent character) is at most k.

### Hint 2

Grow the window one character to the right at a time and shrink from the left while that replacement budget is exceeded.

### Hint 3

The answer is the largest window length you ever reach; the left pointer never needs to move past the best window found so far.
