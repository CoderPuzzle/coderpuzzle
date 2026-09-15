# Valid Permutations for DI Sequence

## Description

You are given a string `s` of length `n` where `s[i]` is either:

- `'D'` means decreasing, or
- `'I'` means increasing.

A permutation `perm` of all the `n + 1` integers in the range `[0, n]` is
called a **valid permutation** if for all valid `i`:

- if `s[i] == 'D'`, then `perm[i] > perm[i + 1]`, and
- if `s[i] == 'I'`, then `perm[i] < perm[i + 1]`.

Return the number of valid permutations `perm`. Since the answer may be
large, return it modulo 10⁹ + 7.

### Example 1

```text
Input: s = "DID"
Output: 5
Explanation: The 5 valid permutations of (0, 1, 2, 3) are:
(1, 0, 3, 2)
(2, 0, 3, 1)
(2, 1, 3, 0)
(3, 0, 2, 1)
(3, 1, 2, 0)
```

### Example 2

```text
Input: s = "D"
Output: 1
```

### Constraints

- `n == s.length`
- `1 <= n <= 200`
- `s[i]` is either `'I'` or `'D'`.
