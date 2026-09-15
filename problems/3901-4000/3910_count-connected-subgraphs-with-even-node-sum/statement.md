# Count Connected Subgraphs with Even Node Sum

## Description

You are given an undirected graph with n nodes labeled from 0 to n - 1. Node i
has a value of nums[i], which is either 0 or 1. The edges of the graph are
given by a 2D array edges where edges[i] = [ui, vi] represents an edge between
node ui and node vi.

For a non-empty subset s of nodes in the graph, we consider the induced
subgraph of s generated as follows:

- We keep only the nodes in s.
- We keep only the edges whose two endpoints are both in s.

Return an integer representing the number of non-empty subsets s of nodes in
the graph such that:

- The induced subgraph of s is connected.
- The sum of node values in s is even.

### Example 1

```text
Input: nums = [1,0,1], edges = [[0,1],[1,2]]
Output: 2
Explanation:
s
connected?
sum of node values
counted?

[0]
Yes
1
No

[1]
Yes
0
Yes

[2]
Yes
1
No

[0,1]
Yes
1
No

[0,2]
No, node 0 and node 2 are disconnected.
2
No

[1,2]
Yes
1
No

[0,1,2]
Yes
2
Yes
```

### Example 2

```text
Input: nums = [1], edges = []
Output: 0
Explanation:
s
connected?
sum of node values
counted?

[0]
Yes
1
No
```

### Constraints

- `1 <= n == nums.length <= 13`
- nums[i] is 0 or 1.
- `0 <= edges.length <= n * (n - 1) / 2`
- `edges[i] = [ui, vi]`
- `0 <= ui < vi < n`
- All edges are distinct.

## Hints

### Hint 1

Enumerate all subsets with bitmasks

### Hint 2

For each subset, check whether the induced subgraph is connected using DFS or
BFS

### Hint 3

Keep track of the parity of the sum of nums in the subset

### Hint 4

Count the subset only if it is connected and the sum is even

### Hint 5

Since n <= 13, a brute-force bitmask solution is feasible
