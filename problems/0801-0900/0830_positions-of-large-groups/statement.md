# Positions of Large Groups

## Description

In a string `s` of lowercase letters, consecutive occurrences of the same
character form groups. A string like `s = "abbxxxxzyy"` breaks into the groups
`"a"`, `"bb"`, `"xxxx"`, `"z"`, and `"yy"`.

Each group occupies an interval `[start, end]`, where `start` and `end` are the
indices of its first and last character, inclusive. In the example above,
`"xxxx"` occupies the interval `[3,6]`.

A group is large when it holds 3 or more characters.

Return the intervals of every large group, sorted in increasing order by start
index.

### Example 1

```text
Input: s = "abbxxxxzzy"
Output: [[3,6]]
Explanation: "xxxx" is the only large group, with start index 3 and end
index 6.
```

### Example 2

```text
Input: s = "abc"
Output: []
Explanation: The groups "a", "b", and "c" are each shorter than 3 characters,
so none of them is large.
```

### Example 3

```text
Input: s = "abcdddeeeeaabbbcd"
Output: [[3,5],[6,9],[12,14]]
Explanation: The large groups are "ddd", "eeee", and "bbb".
```

### Constraints

- `1 <= s.length <= 1000`
- `s` contains only lowercase English letters.
