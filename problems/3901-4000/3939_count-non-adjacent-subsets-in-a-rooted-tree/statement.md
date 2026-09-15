# Count Non Adjacent Subsets in a Rooted Tree

## Description

You are given a rooted tree with `n` nodes labeled from `0` to `n - 1`,
represented by an integer array `parent` of length `n`, where:

- `parent[0] = -1` (node `0` is the root).
- For each `1 <= i < n`, `parent[i]` is the parent of node `i`
  (`0 <= parent[i] < i`).

You are also given an integer array `nums` of length `n`, where `nums[i]` is
the value of node `i`, and an integer `k`.

A non-empty subset of nodes is called valid if:

- The sum of the values of the selected nodes is divisible by `k`.
- No two selected nodes are adjacent in the tree (no node and its direct
  parent are both included in the subset).

Return the number of valid subsets modulo `10⁹ + 7`.

### Example 1

![diagram](figures/3939-1.svg)

```text
Input: parent = [-1,0,1], nums = [1,2,3], k = 3
Output: 1
Explanation:
    The only valid subset is {2}. It contains node 2 with value 3, which is
    divisible by 3.
```

### Example 2

![diagram](figures/3939-2.svg)

```text
Input: parent = [-1,0,0,0], nums = [2,1,2,1], k = 3
Output: 2
Explanation:
    The valid subsets are:
        {1, 2}: Nodes 1 and 2 are both children of node 0 and not directly
        connected to each other. Their values sum to 1 + 2 = 3.
        {2, 3}: Nodes 2 and 3 are also non-adjacent. Their values sum to
        2 + 1 = 3.

    No other subset satisfies both conditions. Therefore, the answer is 2.
```

### Constraints

- `n == parent.length == nums.length`
- `1 <= n <= 1000`
- `parent[0] == -1`
- For all `1 <= i < n`:
    - `0 <= parent[i] < i`
- `1 <= nums[i] <= 10⁹`
- `1 <= k <= 100`
- `parent` describes a valid rooted tree.

## Hints

### Hint 1

Use tree DP. Let `dp0[u][r]` mean node `u` is not selected, and `dp1[u][r]`
mean node `u` is selected, with subtree sum modulo `k` equal to `r`.

### Hint 2

Initialize `dp0[u][0] = 1` and `dp1[u][nums[u] % k] = 1`. When merging child
`v`, if `u` is selected, merge only with `dp0[v]`; otherwise merge with
`dp0[v] + dp1[v]`.

### Hint 3

Finally return `dp0[0][0] + dp1[0][0] - 1`, subtracting the empty subset.
