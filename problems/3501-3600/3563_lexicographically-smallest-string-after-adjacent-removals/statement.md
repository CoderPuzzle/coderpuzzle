# Lexicographically Smallest String After Adjacent Removals

## Description

You are given a string `s` consisting of lowercase English letters.

You can perform the following operation any number of times (including zero):

- Remove any pair of adjacent characters in the string that are consecutive in the alphabet, in either order (e.g., `'a'` and `'b'`, or `'b'` and `'a'`).
- Shift the remaining characters to the left to fill the gap.

Return the lexicographically smallest string that can be obtained after performing the operations optimally.

**Note:** Consider the alphabet as circular, thus `'a'` and `'z'` are consecutive.

### Example 1

```text
Input: s = "abc"
Output: "a"
Explanation: Remove "bc" from the string, leaving "a". No further operations
are possible, so the lexicographically smallest string is "a".
```

### Example 2

```text
Input: s = "bcda"
Output: ""
Explanation: Remove "cd" from the string, leaving "ba", then remove "ba",
leaving "". No further operations are possible, so the answer is "".
```

### Example 3

```text
Input: s = "zdce"
Output: "zdce"
Explanation: Remove "dc" from the string, leaving "ze". No further operations
are possible on "ze". However, since "zdce" is lexicographically smaller than
"ze", the smallest string after all possible removals is "zdce".
```

### Constraints

- `1 <= s.length <= 250`
- `s` consists only of lowercase English letters.

## Hints

### Hint 1

As a result of the operation, some of the substrings can be removed.

### Hint 2

Find out using DP, which substrings can we remove.

### Hint 3

Now, try to build the answer using this DP.

### Hint 4

Define ans[i] = lex smallest string that can be made in [i, n - 1], then ans[i] = lex_smallest of { choose one char s[j] in [i, n - 1] + ans[j + 1] }.
