# Find the Index of Permutation

## Description

Given an array `perm` of length `n` which is a permutation of
`[1, 2, ..., n]`, return the index of `perm` in the lexicographically sorted
array of all of the permutations of `[1, 2, ..., n]`.

Since the answer may be very large, return it modulo `10⁹ + 7`.

### Example 1

```text
Input: perm = [1,2]
Output: 0
Explanation: There are only two permutations in the following order:
[1,2], [2,1]. And [1,2] is at index 0.
```

### Example 2

```text
Input: perm = [3,1,2]
Output: 4
Explanation: There are only six permutations in the following order:
[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]. And [3,1,2] is at
index 4.
```

### Constraints

- `1 <= n == perm.length <= 10⁵`
- `perm` is a permutation of `[1, 2, ..., n]`.

## Hints

### Hint 1

If perm[0] is x, there are at least (x - 1) * (n - 1)! permutations before perm (all the ones starting with numbers less than x).

### Hint 2

Can you find out what happens for perm[1] onwards?

### Hint 3

Think about the count of the numbers that can be in place of perm[i] and come before it.
