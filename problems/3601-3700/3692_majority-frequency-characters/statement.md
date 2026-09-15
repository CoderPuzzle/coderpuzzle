# Majority Frequency Characters

## Description

You are given a string `s` consisting of lowercase English letters.

The frequency group for a value `k` is the set of characters that appear
exactly `k` times in `s`. The majority frequency group is the frequency
group that contains the largest number of distinct characters. If two or
more frequency groups tie for that largest size, pick the group whose
frequency `k` is larger — every group carries its own `k`, so this rule
always selects exactly one winning group.

Return a string containing every character of the majority frequency group.
On LeetCode those characters may be returned in any order; this judge
compares strings exactly, so return them sorted in ascending (lexicographic)
order — every answer the original accepts holds the same characters as this
one.

### Example 1

```text
Input: s = "aaabbbccdddde"
Output: "ab"
Explanation: The groups are k = 4: {d}, k = 3: {a, b}, k = 2: {c} and k = 1:
{e}. The k = 3 group holds the most distinct characters (two), so both 'a'
and 'b' are returned.
```

### Example 2

```text
Input: s = "abcd"
Output: "abcd"
Explanation: Every character appears exactly once, so the k = 1 group holds
all four distinct characters and wins outright.
```

### Example 3

```text
Input: s = "pfpfgi"
Output: "fp"
Explanation: The groups k = 2: {f, p} and k = 1: {g, i} tie with two
distinct characters each; the tie goes to the larger frequency, so 'f' and
'p' are returned.
```

### Constraints

- `1 <= s.length <= 100`
- `s` consists of only lowercase English letters.

## Hints

### Hint 1

Start by counting the frequency of each character in the string.

### Hint 2

Group characters based on their frequencies.

### Hint 3

Identify the group with the largest number of distinct characters.

### Hint 4

If multiple groups tie, select the one with the higher frequency value.

### Hint 5

Construct the answer string using all characters from that chosen group.
