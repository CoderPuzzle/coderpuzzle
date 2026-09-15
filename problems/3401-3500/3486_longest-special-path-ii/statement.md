# Longest Special Path II

## Description

You are given an undirected tree rooted at node `0` with `n` nodes numbered from `0` to `n - 1`, represented by a 2D array `edges` of length `n - 1`, where `edges[i] = [ui, vi, lengthi]` indicates an edge between nodes `ui` and `vi` with length `lengthi`. You are also given an integer array `nums`, where `nums[i]` represents the value at node `i`.

A **special path** is defined as a downward path from an ancestor node to a descendant node in which all node values are distinct, except for at most one value that may appear twice.

Note that a path may start and end at the same node.

Return an array `result` of size 2, where `result[0]` is the length of the longest special path, and `result[1]` is the minimum number of nodes in all possible longest special paths.

### Example 1

```text
Input: edges = [[0,1,1],[1,2,3],[1,3,1],[2,4,6],[4,7,2],[3,5,2],[3,6,5],[6,8,3]], nums = [1,1,0,3,1,2,1,1,0]
Output: [9,3]
Explanation: The longest special paths are 1 -> 2 -> 4 and 1 -> 3 -> 6 -> 8, both having a length of 9. The minimum number of nodes across all longest special paths is 3.
```

![Tree rooted at 0 with the two length-9 special paths 1 -> 2 -> 4 and 1 -> 3 -> 6 -> 8 highlighted.](figures/example-1.svg)

### Example 2

```text
Input: edges = [[1,0,3],[0,2,4],[0,3,5]], nums = [1,1,0,2]
Output: [5,2]
Explanation: The longest path is 0 -> 3 consisting of 2 nodes with a length of 5.
```

![Star-shaped tree; the highlighted edge from 0 to 3 of weight 5 is the longest special path.](figures/example-2.svg)

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

Traverse the tree with DFS from the root and maintain the current root-to-node path, together with prefix sums of the edge lengths, so the length of any downward window ending at the current node can be read in constant time.

### Hint 2

For every value keep the depth of its last occurrence on the path, and maintain two candidate window starts: one where all values in the window are distinct, and a second, never larger one that still tolerates a single value appearing twice. When the current node's value already occurs inside a window, advance the starts accordingly.

### Hint 3

Because DFS backtracks, record enough state (last occurrences and both window starts) before entering a node so it can be restored exactly when leaving the subtree.
