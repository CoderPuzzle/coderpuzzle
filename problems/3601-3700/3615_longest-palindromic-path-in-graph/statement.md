# Longest Palindromic Path in Graph

## Description

You are given an integer `n` and an undirected graph with `n` nodes labeled
from `0` to `n - 1`, and a 2D array `edges`, where `edges[i] = [ui, vi]`
indicates an edge between nodes `ui` and `vi`.

You are also given a string `label` of length `n`, where `label[i]` is the
character associated with node `i`.

You may start at any node and move to any adjacent node, visiting each node at
most once.

Return the maximum possible length of a palindrome that can be formed by
visiting a set of unique nodes along a valid path.

### Example 1

```text
Input: n = 3, edges = [[0,1],[1,2]], label = "aba"
Output: 3
Explanation: The longest palindromic path is from node 0 to node 2 via node 1,
following the path 0 -> 1 -> 2 forming string "aba". This is a valid palindrome
of length 3.
```

![The path 0 - 1 - 2 labeled a, b, a spells the palindrome "aba" of length 3.](figures/example-1.svg)

### Example 2

```text
Input: n = 3, edges = [[0,1],[0,2]], label = "abc"
Output: 1
Explanation: No path with more than one node forms a palindrome. The best option
is any single node, giving a palindrome of length 1.
```

![The star centered on node 0 (a) with leaves b and c admits no palindromic path longer than 1.](figures/example-2.svg)

### Example 3

```text
Input: n = 4, edges = [[0,2],[0,3],[3,1]], label = "bbac"
Output: 3
Explanation: The longest palindromic path is from node 0 to node 1, following
the path 0 -> 3 -> 1, forming string "bcb". This is a valid palindrome of length
3.
```

![The path 0 -> 3 -> 1 spells "bcb", bypassing node 2 (a), for a palindrome of length 3.](figures/example-3.svg)

### Constraints

- `1 <= n <= 14`
- `n - 1 <= edges.length <= n * (n - 1) / 2`
- `edges[i] == [ui, vi]`
- `0 <= ui, vi <= n - 1`
- `ui != vi`
- `label.length == n`
- `label` consists of lowercase English letters.
- There are no duplicate edges.

## Hints

### Hint 1

Use bitmask dynamic programming over the set of visited nodes.

### Hint 2

Build the palindrome by expanding from both endpoints: a new pair of nodes can become endpoints only if neither is already in the current bitmask.

### Hint 3

Before adding a new pair of endpoints, ensure their labels match each other so the path stays a palindrome.

### Hint 4

Memoize each state as dp[mask][prev_l][prev_r], the maximum palindrome length achievable using the visited nodes in mask with current endpoints prev_l and prev_r.
