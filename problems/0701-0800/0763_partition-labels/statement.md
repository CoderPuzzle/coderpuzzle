# Partition Labels

## Description

You are given a string `s`. We want to partition the string into as many
parts as possible so that each letter appears in at most one part. For example,
the string `"ababcc"` can be partitioned into `["abab", "cc"]`, but partitions
such as `["aba", "bcc"]` or `["ab", "ab", "cc"]` are invalid.

Note that the partition is done so that after concatenating all the parts in
order, the resultant string should be `s`.

Return a list of integers representing the size of these parts.

### Example 1

```text
Input: s = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits s into less parts.
```

### Example 2

```text
Input: s = "eccbbbbdec"
Output: [10]
```

### Constraints

- `1 <= s.length <= 500`
- `s` consists of lowercase English letters.

## Hints

### Hint 1

Greedily choose the smallest partition that includes the first letter. With something like "abaccbdeffed", you may need to extend it to include every position where a chosen letter reappears.

### Hint 2

Precompute last['b'] = 5, the last index of each letter, to know how far a partition must stretch.

### Hint 3

A partition ends at the first index i that is greater than or equal to the last occurrence of every letter seen so far.
