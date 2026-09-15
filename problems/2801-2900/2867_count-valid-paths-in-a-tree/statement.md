# Count Valid Paths in a Tree

## Description

There is an undirected tree with `n` nodes labeled from `1` to `n`. You are
given the integer `n` and a 2D integer array `edges` of length `n - 1`, where
`edges[i] = [ui, vi]` indicates that there is an edge between nodes `ui` and
`vi` in the tree.

Return the number of valid paths in the tree.

A path `(a, b)` is valid if there exists exactly one prime number among the
node labels in the path from `a` to `b`.

Note that:

- The path `(a, b)` is a sequence of distinct nodes starting with node `a` and
  ending with node `b` such that every two adjacent nodes in the sequence share
  an edge in the tree.
- Path `(a, b)` and path `(b, a)` are considered the same and counted only
  once.

### Example 1

```text
Input: n = 5, edges = [[1,2],[1,3],[2,4],[2,5]]
Output: 4
Explanation: The pairs with exactly one prime number on the path between them are:
- (1, 2) since the path from 1 to 2 contains prime number 2.
- (1, 3) since the path from 1 to 3 contains prime number 3.
- (1, 4) since the path from 1 to 4 contains prime number 2.
- (2, 4) since the path from 2 to 4 contains prime number 2.
```

![The primes 2, 3 and 5 are shaded; exactly one prime lies on the paths (1,2), (1,3), (1,4) and (2,4).](figures/example-1.svg)

### Example 2

```text
Input: n = 6, edges = [[1,2],[1,3],[2,4],[3,5],[3,6]]
Output: 6
Explanation: The pairs with exactly one prime number on the path between them are:
- (1, 2) since the path from 1 to 2 contains prime number 2.
- (1, 3) since the path from 1 to 3 contains prime number 3.
- (1, 4) since the path from 1 to 4 contains prime number 2.
- (1, 6) since the path from 1 to 6 contains prime number 3.
- (2, 4) since the path from 2 to 4 contains prime number 2.
- (3, 6) since the path from 3 to 6 contains prime number 3.
```

![Six pairs, among them (1,6) through the prime 3 and (2,4) through the prime 2, have exactly one prime on their path.](figures/example-2.svg)

### Constraints

- `1 <= n <= 10^5`
- `edges.length == n - 1`
- `edges[i].length == 2`
- `1 <= ui, vi <= n`
- The input is generated such that edges represent a valid tree.

## Hints

### Hint 1

Use the sieve of Eratosthenes to find all prime numbers in the range [1, n].

### Hint 2

Root the tree at any node.

### Hint 3

Let dp[i][0] be the number of vertical paths starting from i containing no prime nodes, and dp[i][1] be the number of vertical paths starting from i containing exactly one prime node.

### Hint 4

For each node i, using the computed dp matrix, count the number of unordered pairs (a, b) such that the path from a to b contains exactly one prime number.
