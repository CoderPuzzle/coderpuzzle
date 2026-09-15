# Longest Path With Different Adjacent Characters

## Description

You are given a tree (i.e. a connected, undirected graph that has no cycles)
rooted at node `0` consisting of `n` nodes numbered from `0` to `n - 1`. The
tree is represented by a 0-indexed array `parent` of size `n`, where
`parent[i]` is the parent of node `i`. Since node `0` is the root,
`parent[0] == -1`.

You are also given a string `s` of length `n`, where `s[i]` is the character
assigned to node `i`.

Return the length of the longest path in the tree such that no pair of
adjacent nodes on the path have the same character assigned to them.

### Example 1

```text
Input: parent = [-1,0,0,1,1,2], s = "abacbe"
Output: 3
Explanation: The longest path where each two adjacent nodes have different
characters in the tree is the path: 0 -> 1 -> 3. The length of this path is 3,
so 3 is returned. It can be proven that there is no longer path that satisfies
the conditions.
```

![The tree with letters beside each node; the highlighted path 0 - 1 - 3 spells a, b, c and has length 3.](figures/example-1.svg)

### Example 2

```text
Input: parent = [-1,0,0,0], s = "aabc"
Output: 3
Explanation: The longest path where each two adjacent nodes have different
characters is the path: 2 -> 0 -> 3. The length of this path is 3, so 3 is
returned.
```

![The tree with letters beside each node; the highlighted path 2 - 0 - 3 spells b, a, c and has length 3.](figures/example-2.svg)

### Constraints

- `n == parent.length == s.length`
- `1 <= n <= 10^5`
- `0 <= parent[i] <= n - 1` for all `i >= 1`
- `parent[0] == -1`
- `parent` represents a valid tree.
- `s` consists of only lowercase English letters.

## Hints

### Hint 1

Do a DFS from the root. At each node, calculate the longest path we can make from two branches of that subtree.

### Hint 2

To do that, we need to find the length of the longest path from each of the node's children — keeping the top two child chains lets you join them through the node.

### Hint 3

A child chain can only be extended through the current node when its character differs from the current node's character.
