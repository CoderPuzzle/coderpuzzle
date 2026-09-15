# Number of Nodes in the Sub-Tree With the Same Label

## Description

You are given a tree — a connected, undirected graph with no cycles — made
of `n` nodes numbered `0` to `n - 1`, described by exactly `n - 1` edges.
The tree is rooted at node `0`, and every node carries a label: a
lower-case character given by the string `labels`, where `labels[i]` is
the label of node `i`.

`edges` lists the tree's connections: each `edges[i] = [ai, bi]` means
there is an edge between nodes `ai` and `bi`.

Return an array `ans` of length `n` where `ans[i]` is the number of nodes
in the subtree of node `i` that share node `i`'s label.

The subtree of a node consists of that node together with all of its
descendants.

### Example 1

![diagram](figures/1519-1.svg)

```text
Input: n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], labels = "abaedcd"
Output: [2,1,1,1,1,1,1]
Explanation: Node 0 has label 'a', and its subtree also contains node 2,
which has label 'a' too, so the answer for node 0 is 2. (Every node counts
as part of its own subtree.)
Node 1 has label 'b'. Its subtree contains nodes 1, 4, and 5, but 4 and 5
have different labels, so the answer for node 1 is just 1 — itself.
```

### Example 2

![diagram](figures/1519-2.svg)

```text
Input: n = 4, edges = [[0,1],[1,2],[0,3]], labels = "bbbb"
Output: [4,2,1,1]
Explanation: The subtree of node 2 contains only node 2, so its answer is
1. The subtree of node 3 contains only node 3, so its answer is 1. The
subtree of node 1 contains nodes 1 and 2, both labeled 'b', so its answer
is 2. The subtree of node 0 contains nodes 0, 1, 2, and 3, all labeled
'b', so its answer is 4.
```

### Example 3

![diagram](figures/1519-3.svg)

```text
Input: n = 5, edges = [[0,1],[0,2],[1,3],[0,4]], labels = "aabab"
Output: [3,2,1,1,1]
```

### Constraints

- `1 <= n <= 10⁵`
- `edges.length == n - 1`
- `edges[i].length == 2`
- `0 <= ai, bi < n`
- `ai != bi`
- `labels.length == n`
- `labels` consists only of lowercase English letters.

## Hints

### Hint 1

Traverse the tree so that each node hands a summary back up to its parent.

### Hint 2

Make that summary a length-26 vector holding the count of each label
inside the node's own subtree.
