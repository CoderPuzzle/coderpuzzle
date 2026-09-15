# Shortest Path With At Most K Consecutive Identical Characters

## Description

You are given an integer n representing the number of nodes in a directed weighted graph, numbered from 0 to n - 1. This is represented by a 2D integer array edges, where edges[i] = [ui, vi, wi] represents a directed edge from node ui to node vi with weight wi.

You are also given a string labels of length n, where labels[i] is the character assigned to node i, and an integer k.

Return the minimum total edge weight of a path from node 0 to node n - 1 such that the concatenation of the labels of the nodes along the path contains at most k consecutive identical characters. If no valid path exists, return -1.

### Example 1

```text
Input: n = 3, edges = [[0,1,1],[1,2,1],[0,2,3]], labels = "aab", k = 1

Output: 3

Explanation:

The optimal valid path from node 0 to node 2 is as follows:

    Use edges[2] = [0, 2, 3] to reach node 2 with a weight wi = 3.

The corresponding concatenation of labels is "ab", which satisfies at most k = 1 consecutive identical characters. Thus, the answer is 3.
```

### Example 2

```text
Input: n = 3, edges = [[0,1,1],[1,2,1],[0,2,3]], labels = "aab", k = 2

Output: 2

Explanation:

The optimal valid path from node 0 to node 2 is as follows:

    Use edges[0] = [0, 1, 1] to reach node 1 with weight wi = 1.
    Use edges[1] = [1, 2, 1] to reach node 2 with weight wi = 1.

The corresponding concatenation of labels is "aab", which satisfies at most k = 2 consecutive identical characters. Thus, the answer is 2.
```

### Example 3

```text
Input: n = 3, edges = [[0,1,1],[1,2,1]], labels = "aaa", k = 2

Output: -1

Explanation:

There is no valid path from node 0 to node 2 that satisfies at most k = 2 consecutive identical characters. Thus, the answer is -1.
```

### Constraints

- `1 <= n == labels.length <= 5 * 10⁴`
- `0 <= edges.length <= 5 * 10⁴`
- `edges[i] == [uᵢ, vᵢ, wᵢ]`
- `0 <= uᵢ, vᵢ <= n - 1`
- `uᵢ != vᵢ`
- `1 <= wᵢ <= 10⁴`
- labels consists of lowercase English letters
- `1 <= k <= 50`

## Hints

### Hint 1

The validity of a path depends not only on the current node, but also on how many consecutive times the current node’s label has appeared at the end of the path.

### Hint 2

Use Dijkstra on states (node, count), where count is the current consecutive run length of labels[node].

### Hint 3

When moving from node u to node v, the next count becomes count + 1 if labels[u] == labels[v], otherwise it becomes 1. Ignore transitions where the next count exceeds k.

### Hint 4

The answer is the minimum distance among all states ending at node n - 1.
