# Sort Characters By Frequency

## Description

Given a string `s`, sort it in decreasing order based on the frequency of the
characters. The frequency of a character is the number of times it appears in
the string.

Return the sorted string. If there are multiple answers, return any of them.

This judge compares the returned string exactly, so it pins one canonical
answer: characters are emitted most frequent first, and characters that share
a frequency are emitted in ascending order — the order every output below
already follows.

### Example 1

```text
Input: s = "tree"
Output: "eert"
Explanation: 'e' appears twice while 'r' and 't' both appear once.
So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid
answer.
```

### Example 2

```text
Input: s = "cccaaa"
Output: "aaaccc"
Explanation: Both 'c' and 'a' appear three times, so both "cccaaa" and
"aaaccc" are valid answers. Note that "cacaca" is incorrect, as the same
characters must be together.
```

### Example 3

```text
Input: s = "Aabb"
Output: "bbAa"
Explanation: "bbaA" is also a valid answer, but "Aabb" is incorrect.
Note that 'A' and 'a' are treated as two different characters.
```

### Constraints

- `1 <= s.length <= 5 * 10⁵`
- `s` consists of uppercase and lowercase English letters and digits.
