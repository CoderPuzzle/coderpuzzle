# Buddy Strings

## Description

Given two strings `s` and `goal`, return `true` if you can obtain `goal` by
swapping two letters in `s`, otherwise return `false`.

A swap picks two indices `i` and `j` with `i != j` and exchanges the
characters at `s[i]` and `s[j]`. For instance, swapping the letters at
indices 0 and 2 of `"abcd"` yields `"cbad"`.

### Example 1

```text
Input: s = "ab", goal = "ba"
Output: true
Explanation: Swap s[0] = 'a' and s[1] = 'b' to get "ba", which equals goal.
```

### Example 2

```text
Input: s = "ab", goal = "ab"
Output: false
Explanation: The only available swap exchanges s[0] = 'a' and s[1] = 'b',
which yields "ba" and differs from goal.
```

### Example 3

```text
Input: s = "aa", goal = "aa"
Output: true
Explanation: Swap s[0] = 'a' and s[1] = 'a'; the string stays "aa", which
equals goal.
```

### Constraints

- `1 <= s.length, goal.length <= 2 * 10⁴`
- `s` and `goal` consist of lowercase English letters.
