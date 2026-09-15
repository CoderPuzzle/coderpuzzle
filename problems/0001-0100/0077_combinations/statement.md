# Combinations

## Description

Given two integers `n` and `k`, return all possible combinations of `k` numbers chosen from the
range `[1, n]`.

Return the combinations in the order the examples show: each combination lists its numbers in
ascending order, and the list is sorted in ascending lexicographic order, each combination compared
element by element. Consecutive combinations therefore share their leading elements.

### Example 1

```text
Input: n = 4, k = 2
Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
Explanation: There are 4 choose 2 = 6 total combinations. Note that combinations are unordered, i.e., [1,2] and [2,1] are considered to be the same combination.
```

### Example 2

```text
Input: n = 1, k = 1
Output: [[1]]
Explanation: There is 1 choose 1 = 1 total combination.
```

### Constraints

- `1 <= n <= 20`
- `1 <= k <= n`
