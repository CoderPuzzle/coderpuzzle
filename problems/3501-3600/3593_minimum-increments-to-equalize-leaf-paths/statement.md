# Minimum Increments to Equalize Leaf Paths

## Description

You are given an integer `n` and an undirected tree rooted at node `0` with
`n` nodes numbered from `0` to `n - 1`. This is represented by a 2D array
`edges` of length `n - 1`, where `edges[i] = [ui, vi]` indicates an edge
from node `ui` to `vi` .

Each node `i` has an associated cost given by `cost[i]`, representing the
cost to traverse that node.

The score of a path is defined as the sum of the costs of all nodes along
the path.

Your goal is to make the scores of all root-to-leaf paths equal by
increasing the cost of any number of nodes by any non-negative amount.

Return the minimum number of nodes whose cost must be increased to make all
root-to-leaf path scores equal.

### Example 1

![diagram](figures/3593-1.svg)

```text
Input: n = 3, edges = [[0,1],[0,2]], cost = [2,1,3]
Output: 1
Explanation: There are two root-to-leaf paths:
Path 0 → 1 has a score of 2 + 1 = 3.
Path 0 → 2 has a score of 2 + 3 = 5.
To make all root-to-leaf path scores equal to 5, increase the cost of node 1
by 2. Only one node is increased, so the output is 1.
```

### Example 2

![diagram](figures/3593-2.svg)

```text
Input: n = 3, edges = [[0,1],[1,2]], cost = [5,1,4]
Output: 0
Explanation: There is only one root-to-leaf path:
Path 0 → 1 → 2 has a score of 5 + 1 + 4 = 10.
Since only one root-to-leaf path exists, all path costs are trivially equal,
and the output is 0.
```

### Example 3

![diagram](figures/3593-3.svg)

```text
Input: n = 5, edges = [[0,4],[0,1],[1,2],[1,3]], cost = [3,4,1,1,7]
Output: 1
Explanation: There are three root-to-leaf paths:
Path 0 → 4 has a score of 3 + 7 = 10.
Path 0 → 1 → 2 has a score of 3 + 4 + 1 = 8.
Path 0 → 1 → 3 has a score of 3 + 4 + 1 = 8.
To make all root-to-leaf path scores equal to 10, increase the cost of node
1 by 2. Thus, the output is 1.
```

### Constraints

- `2 <= n <= 10⁵`
- `edges.length == n - 1`
- `edges[i] == [ui, vi]`
- `0 <= ui, vi < n`
- `cost.length == n`
- `1 <= cost[i] <= 10⁹`
- The input is generated such that `edges` represents a valid tree.

## Hints

### Hint 1

Every root-to-leaf path's score must be raised to maxLeafCost, the maximum sum among all root-to-leaf paths.

### Hint 2

For each node, compute minIncrease[node], the minimum additional cost required so that every root-to-leaf path passing through that node reaches maxLeafCost.

### Hint 3

The final answer, ans, is the count of nodes for which minIncrease[node] differs from minIncrease[parent].
