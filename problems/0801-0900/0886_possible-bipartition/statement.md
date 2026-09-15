# Possible Bipartition

## Description

We want to split a group of `n` people (labeled from `1` to `n`) into two
groups of any size. Each person may dislike some other people, and they should
not go into the same group.

Given the integer `n` and the array `dislikes` where
`dislikes[i] = [a_i, b_i]` indicates that the person labeled `a_i` does not
like the person labeled `b_i`, return `true` if it is possible to split
everyone into two groups in this way.

### Example 1

```text
Input: n = 4, dislikes = [[1,2],[1,3],[2,4]]
Output: true
Explanation: The first group has [1,4], and the second group has [2,3].
```

### Example 2

```text
Input: n = 3, dislikes = [[1,2],[1,3],[2,3]]
Output: false
Explanation: We need at least 3 groups to divide them. We cannot put them
into two groups.
```

### Constraints

- `1 <= n <= 2000`
- `0 <= dislikes.length <= 10^4`
- `dislikes[i].length == 2`
- `1 <= a_i < b_i <= n`
- All the pairs of dislikes are unique.

## Hints

### Hint 1

Build an adjacency list and try to 2-color the graph with BFS or DFS.

### Hint 2

Color each uncolored person, then verify that every edge connects opposite colors; any conflict means the split is impossible.

### Hint 3

The dislike graph may be disconnected — start a fresh traversal from every still-uncolored person.
