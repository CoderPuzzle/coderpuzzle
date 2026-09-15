# Maximize Subarrays After Removing One Conflicting Pair

## Description

You are given an integer `n` which represents an array `nums` containing the
numbers from `1` to `n` in order. Additionally, you are given a 2D array
`conflictingPairs`, where `conflictingPairs[i] = [a, b]` indicates that `a`
and `b` form a conflicting pair.

Remove exactly one element from `conflictingPairs`. Afterward, count the number
of non-empty subarrays of `nums` which do not contain both `a` and `b` for any
remaining conflicting pair `[a, b]`.

Return the maximum number of subarrays possible after removing exactly one
conflicting pair.

### Example 1

```text
Input: n = 4, conflictingPairs = [[2,3],[1,4]]
Output: 9
Explanation: Remove [2, 3]. Now conflictingPairs = [[1, 4]]. There are 9 subarrays in nums where [1, 4] do not appear together: [1], [2], [3], [4], [1, 2], [2, 3], [3, 4], [1, 2, 3] and [2, 3, 4].
```

### Example 2

```text
Input: n = 5, conflictingPairs = [[1,2],[2,5],[3,5]]
Output: 12
Explanation: Remove [1, 2]. Now conflictingPairs = [[2, 5], [3, 5]]. There are 12 subarrays in nums where [2, 5] and [3, 5] do not appear together.
```

### Constraints

- `2 <= n <= 10^5`
- `1 <= conflictingPairs.length <= 2 * n`
- `conflictingPairs[i].length == 2`
- `1 <= conflictingPairs[i][j] <= n`
- `conflictingPairs[i][0] != conflictingPairs[i][1]`

## Hints

### Hint 1

Let f[i] (where i = 1, 2, ..., n) be the end index of the longest valid subarray (without any conflicting pair) starting at index i.

### Hint 2

The answer is sum(f[i] - i + 1) for i in [1..n], which simplifies to sum(f[i]) - n * (n + 1) / 2 + n.

### Hint 3

Sort the conflicting pairs by their larger value in non-increasing order and update each prefix of the f array accordingly.
