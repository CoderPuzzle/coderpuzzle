# Longest Special Path

## Description

You are given an undirected tree rooted at node `0` with `n` nodes numbered from `0` to `n - 1`, represented by a 2D array `edges` of length `n - 1`, where `edges[i] = [ui, vi, lengthi]` indicates an edge between nodes `ui` and `vi` with length `lengthi`. You are also given an integer array `nums`, where `nums[i]` represents the value at node `i`.

A **special path** is defined as a downward path from an ancestor node to a descendant node such that all the values of the nodes in that path are unique.

Note that a path may start and end at the same node.

Return an array `result` of size 2, where `result[0]` is the length of the longest special path, and `result[1]` is the minimum number of nodes in all possible longest special paths.

### Example 1

```text
Input: edges = [[0,1,2],[1,2,3],[1,3,5],[1,4,4],[2,5,6]], nums = [2,1,2,1,3,1]
Output: [6,2]
Explanation: The longest special paths are 2 -> 5 and 0 -> 1 -> 4, both having a length of 6. The minimum number of nodes across all longest special paths is 2.
```

![The two longest special paths, 0 -> 1 -> 4 and 2 -> 5, each of total edge length 6.](figures/example-1.svg)

### Example 2

```text
Input: edges = [[1,0,8]], nums = [2,2]
Output: [0,1]
Explanation: The longest special paths are 0 and 1, both having a length of 0. The minimum number of nodes across all longest special paths is 1.
```

![Nodes 0 and 1 both hold value 2, so the edge of length 8 joins no special path.](figures/example-2.svg)

### Constraints

- `2 <= n <= 5 * 10⁴`
- `edges.length == n - 1`
- `edges[i].length == 3`
- `0 <= ui, vi < n`
- `1 <= lengthi <= 10³`
- `nums.length == n`
- `0 <= nums[i] <= 5 * 10⁴`
- The input is generated such that `edges` represents a valid tree.

## Hints

### Hint 1

Use DFS to traverse the tree and maintain the current path length from the root (starting at 0) to the current node.

### Hint 2

Use prefix sums to calculate the longest path ending at the current node with all unique values.
