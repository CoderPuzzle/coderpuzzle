# Check if All Characters Have Equal Number of Occurrences

## Description

Given a string `s`, return `true` if `s` is a good string, or `false`
otherwise.

A string `s` is good if all the characters that appear in `s` have the same
number of occurrences (i.e., the same frequency).

### Example 1

```text
Input: s = "abacbc"
Output: true
Explanation: The characters that appear in s are 'a', 'b', and 'c'. All characters occur 2 times in s.
```

### Example 2

```text
Input: s = "aaabb"
Output: false
Explanation: The characters that appear in s are 'a' and 'b'.
'a' occurs 3 times while 'b' occurs 2 times, which is not the same number of times.
```

### Constraints

- `1 <= s.length <= 1000`
- `s` consists of lowercase English letters.

## Hints

### Hint 1

Build a dictionary containing the frequency of each character appearing in
`s`.

### Hint 2

Check if all values in the dictionary are the same.
