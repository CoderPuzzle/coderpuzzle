# Permutations III

## Description

Given an integer `n`, an alternating permutation is a permutation of the first `n`
positive integers such that no two adjacent elements are both odd or both even.

Return all such alternating permutations sorted in lexicographical order.

### Example 1

```text
Input: n = 4
Output: [[1,2,3,4],[1,4,3,2],[2,1,4,3],[2,3,4,1],[3,2,1,4],[3,4,1,2],[4,1,2,3],[4,3,2,1]]
```

### Example 2

```text
Input: n = 2
Output: [[1,2],[2,1]]
```

### Example 3

```text
Input: n = 3
Output: [[1,2,3],[3,2,1]]
```

### Constraints

- `1 <= n <= 10`

## Hints

### Hint 1

Use backtracking to generate permutations of the first `n` positive integers while
ensuring that each added number alternates between odd and even.
