# DI String Match

## Description

A permutation `perm` of `n + 1` integers of all the integers in the range
`[0, n]` can be represented as a string `s` of length `n` where:

- `s[i] == 'I'` if `perm[i] < perm[i + 1]`, and
- `s[i] == 'D'` if `perm[i] > perm[i + 1]`.

Given a string `s`, reconstruct the permutation `perm` and return it.

Several permutations can match the same string, so this problem pins one
canonical answer. Scan `s` from left to right placing the extreme value each
character asks for — when `s[i] == 'I'` place the smallest value not yet used,
when `s[i] == 'D'` place the largest value not yet used — and after the scan
place the single value that remains in the final slot.

### Example 1

```text
Input: s = "IDID"
Output: [0,4,1,3,2]
Explanation: On each 'I' the smallest unused value is placed, on each 'D' the
largest, and the leftover value 2 takes the last slot.
```

### Example 2

```text
Input: s = "III"
Output: [0,1,2,3]
```

### Example 3

```text
Input: s = "DDI"
Output: [3,2,0,1]
```

### Constraints

- `1 <= s.length <= 10⁵`
- `s[i]` is either `'I'` or `'D'`.
