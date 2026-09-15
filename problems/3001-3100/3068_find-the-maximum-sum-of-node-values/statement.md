# Find the Maximum Sum of Node Values

## Description

There exists an undirected tree with `n` nodes numbered `0` to `n - 1`. You
are given a 0-indexed 2D integer array `edges` of length `n - 1`, where
`edges[i] = [ui, vi]` indicates that there is an edge between nodes `ui` and
`vi`. You are also given a positive integer `k` and a 0-indexed array of
non-negative integers `nums` of length `n`, where `nums[i]` is the value of
node `i`.

Alice wants the sum of the values of the tree nodes to be maximum. She can
perform the following operation any number of times (including zero):

- Choose any edge `[u, v]` connecting nodes `u` and `v`, and update their
  values: `nums[u] = nums[u] XOR k` and `nums[v] = nums[v] XOR k`.

Return the maximum possible sum of the values Alice can achieve.

### Example 1

```text
Input: nums = [1,2,1], k = 3, edges = [[0,1],[0,2]]
Output: 6
Explanation: Alice can achieve the maximum sum of 6 using a single operation:
choose the edge [0,2]. nums[0] and nums[2] become 1 XOR 3 = 2, and the array
nums becomes [1,2,1] -> [2,2,2]. The total sum of the values is 2 + 2 + 2 = 6.
```

![The path graph with nums = [1,2,1]; one operation on edge [0,2] turns both 1s into 2s for a sum of 6.](figures/example-1.svg)

### Example 2

```text
Input: nums = [2,3], k = 7, edges = [[0,1]]
Output: 9
Explanation: Alice can achieve the maximum sum of 9 using a single operation:
choose the edge [0,1]. nums[0] becomes 2 XOR 7 = 5 and nums[1] becomes
3 XOR 7 = 4, and the array nums becomes [2,3] -> [5,4]. The total sum is
5 + 4 = 9.
```

### Example 3

```text
Input: nums = [7,7,7,7,7,7], k = 3, edges = [[0,1],[0,2],[0,3],[0,4],[0,5]]
Output: 42
Explanation: The maximum achievable sum is 42, which Alice can reach by
performing no operations.
```

### Constraints

- `2 <= n == nums.length <= 2 * 10⁴`
- `1 <= k <= 10⁹`
- `0 <= nums[i] <= 10⁹`
- `edges.length == n - 1`
- `edges[i].length == 2`
- `0 <= edges[i][0], edges[i][1] <= n - 1`
- The input is generated such that `edges` represents a valid tree.

## Hints

### Hint 1

Select any node as the root.

### Hint 2

Let dp[x][c] be the maximum sum we can get for the subtree rooted at node x, where c is a boolean representing whether the edge between node x and its parent (if any) is selected.

### Hint 3

dp[x][c] = max(sum(dp[y][cy]) + v(nums[x], sum(cy) + c)) where cy is 0 or 1. When sum(cy) + c is odd, v(nums[x], sum(cy) + c) = nums[x] XOR k; when it is even, v(nums[x], sum(cy) + c) = nums[x].

### Hint 4

There is an easier solution: consider the parity of the number of elements where nums[i] XOR k > nums[i].
