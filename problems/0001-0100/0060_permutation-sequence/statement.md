# Permutation Sequence

## Description

The set `[1, 2, 3, ..., n]` contains a total of `n!` unique permutations.

By listing and labeling all of the permutations in order, we get the following sequence for `n = 3`:

```text
"123"
"132"
"213"
"231"
"312"
"321"
```

Given `n` and `k`, return the `k`th permutation sequence.

### Example 1

```text
Input: n = 3, k = 3
Output: "213"
```

### Example 2

```text
Input: n = 4, k = 9
Output: "2314"
```

### Example 3

```text
Input: n = 3, k = 1
Output: "123"
```

### Constraints

- `1 <= n <= 9`
- `1 <= k <= n!`
