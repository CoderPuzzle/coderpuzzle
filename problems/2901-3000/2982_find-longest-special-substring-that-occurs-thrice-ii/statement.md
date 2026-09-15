# Find Longest Special Substring That Occurs Thrice II

## Description

You are given a string s that consists of lowercase English letters.

A string is called special if it is made up of only a single character. For
example, the string "abc" is not special, whereas the strings "ddd", "zz",
and "f" are special.

Return the length of the longest special substring of s which occurs at
least thrice, or -1 if no special substring occurs at least thrice.

A substring is a contiguous non-empty sequence of characters within a
string.

### Example 1

```text
Input: s = "aaaa"
Output: 2
Explanation: The longest special substring which occurs thrice is "aa":
substrings "aaaa", "aaaa", and "aaaa".
It can be shown that the maximum length achievable is 2.
```

### Example 2

```text
Input: s = "abcdef"
Output: -1
Explanation: There exists no special substring which occurs at least
thrice. Hence return -1.
```

### Example 3

```text
Input: s = "abcaba"
Output: 1
Explanation: The longest special substring which occurs thrice is "a":
substrings "abcaba", "abcaba", and "abcaba".
It can be shown that the maximum length achievable is 1.
```

### Constraints

- `3 <= s.length <= 5 * 10⁵`
- `s` consists of only lowercase English letters.

## Hints

### Hint 1

Let len[i] be the length of the longest special string ending with s[i].

### Hint 2

If i > 0 and s[i] == s[i - 1], len[i] = len[i - 1] + 1. Otherwise len[i] == 1.

### Hint 3

Group all the len[i] by s[i]. We have at most 26 groups.

### Hint 4

The maximum value of the third largest len[i] in each group is the answer.

### Hint 5

We only need to maintain the top three values for each group. You can use
sorting, heap, or brute-force comparison to find the third largest value in
each group.
