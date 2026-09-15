# Count Number of Possible Root Nodes

## Description

Alice has an undirected tree with `n` nodes labeled from `0` to `n - 1`. The
tree is represented as a 2D integer array `edges` of length `n - 1` where
`edges[i] = [ai, bi]` indicates that there is an edge between nodes `ai` and
`bi` in the tree.

Alice wants Bob to find the root of the tree. She allows Bob to make several
guesses about her tree. In one guess, he does the following:

- Chooses two distinct integers `u` and `v` such that there exists an edge
  `[u, v]` in the tree.
- He tells Alice that `u` is the parent of `v` in the tree.

Bob's guesses are represented by a 2D integer array `guesses` where
`guesses[j] = [uj, vj]` indicates Bob guessed `uj` to be the parent of `vj`.

Alice being lazy, does not reply to each of Bob's guesses, but just says that
at least `k` of his guesses are true.

Given the 2D integer arrays `edges`, `guesses` and the integer `k`, return the
number of possible nodes that can be the root of Alice's tree. If there is no
such tree, return `0`.

### Example 1

```text
Input: edges = [[0,1],[1,2],[1,3],[4,2]], guesses = [[1,3],[0,1],[1,0],[2,4]], k = 3
Output: 3
Explanation:
Root = 0, correct guesses = [1,3], [0,1], [2,4]
Root = 1, correct guesses = [1,3], [1,0], [2,4]
Root = 2, correct guesses = [1,3], [1,0], [2,4]
Root = 3, correct guesses = [1,0], [2,4]
Root = 4, correct guesses = [1,3], [1,0]
Considering 0, 1, or 2 as root node leads to 3 correct guesses.
```

![Tree 0-1-2-4 / 1-3 with the four guesses as dashed arrows; rooting at 0, 1 or 2 makes 3 of them true.](figures/example-1.svg)

### Example 2

```text
Input: edges = [[0,1],[1,2],[2,3],[3,4]], guesses = [[1,0],[3,4],[2,1],[3,2]], k = 1
Output: 5
Explanation:
Root = 0, correct guesses = [3,4]
Root = 1, correct guesses = [1,0], [3,4]
Root = 2, correct guesses = [1,0], [2,1], [3,4]
Root = 3, correct guesses = [1,0], [2,1], [3,2], [3,4]
Root = 4, correct guesses = [1,0], [2,1], [3,2]
Considering any node as root will give at least 1 correct guess.
```

![Chain 0-1-2-3-4 with guesses as dashed arcs; every root keeps at least one guess true, so all 5 roots count.](figures/example-2.svg)

### Constraints

- `edges.length == n - 1`
- `2 <= n <= 10^5`
- `1 <= guesses.length <= 10^5`
- `0 <= ai, bi, uj, vj <= n - 1`
- `ai != bi`
- `uj != vj`
- `edges` represents a valid tree.
- `guesses[j]` is an edge of the tree.
- `guesses` is unique.
- `0 <= k <= guesses.length`

## Hints

### Hint 1

Fix one node as root and count the correct guesses with a single DFS; this gives the answer for that root in O(n).

### Hint 2

Store the guesses in a hash set so a parent-child direction can be checked in O(1).

### Hint 3

Rerooting: when moving the root from a node u to an adjacent node v, exactly the edge (u, v) changes direction - the correct-guess count changes by at most 1 in each direction.

### Hint 4

Traverse the tree once from the fixed root, updating the count incrementally for every node and counting how many roots reach at least k correct guesses.
