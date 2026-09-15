# Minimum Cost Good Caption

## Description

You are given a string caption of length n. A good caption is a string where
every character appears in groups of at least 3 consecutive occurrences.

For example:

- "aaabbb" and "aaaaccc" are good captions.
- "aabbb" and "ccccd" are not good captions.

You can perform the following operation any number of times:

Choose an index i (where 0 <= i < n) and change the character at that index
to either:

- The character immediately before it in the alphabet (if caption[i] != 'a').
- The character immediately after it in the alphabet (if caption[i] != 'z').

Your task is to convert the given caption into a good caption using the
minimum number of operations, and return it. If there are multiple possible
good captions, return the lexicographically smallest one among them. If it is
impossible to create a good caption, return an empty string "".

### Example 1

```text
Input: caption = "cdcd"
Output: "cccc"
Explanation: It can be shown that the given caption cannot be transformed
into a good caption with fewer than 2 operations. The possible good captions
that can be created using exactly 2 operations are:

- "dddd": Change caption[0] and caption[2] to their next character 'd'.
- "cccc": Change caption[1] and caption[3] to their previous character 'c'.

Since "cccc" is lexicographically smaller than "dddd", return "cccc".
```

### Example 2

```text
Input: caption = "aca"
Output: "aaa"
Explanation: It can be proven that the given caption requires at least 2
operations to be transformed into a good caption. The only good caption that
can be obtained with exactly 2 operations is as follows:

- Operation 1: Change caption[1] to 'b'. caption = "aba".
- Operation 2: Change caption[1] to 'a'. caption = "aaa".

Thus, return "aaa".
```

### Example 3

```text
Input: caption = "bc"
Output: ""
Explanation: It can be shown that the given caption cannot be converted to
a good caption by using any number of operations.
```

### Constraints

- `1 <= caption.length <= 5 * 10⁴`
- `caption` consists only of lowercase English letters.

## Hints

### Hint 1

Construct a DP table and try all possible characters at every index.

### Hint 2

Choose characters greedily to get the lexicographically smallest caption.
