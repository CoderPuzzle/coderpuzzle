# Maximum Number of Accepted Invitations

## Description

There are `m` boys and `n` girls in a class attending an upcoming party.

You are given an `m x n` integer matrix `grid`, where `grid[i][j]` equals `0`
or `1`. If `grid[i][j] == 1`, then that means the `i`th boy can invite the
`j`th girl to the party. A boy can invite at most one girl, and a girl can
accept at most one invitation from a boy.

Return the maximum possible number of accepted invitations.

### Example 1

```text
Input: grid = [[1,1,1],[1,0,1],[0,0,1]]
Output: 3
Explanation: The invitations are sent as follows:
- The 1st boy invites the 2nd girl.
- The 2nd boy invites the 1st girl.
- The 3rd boy invites the 3rd girl.
```

### Example 2

```text
Input: grid = [[1,0,1,0],[1,0,0,0],[0,0,1,0],[1,1,1,0]]
Output: 3
Explanation: The invitations are sent as follows:
-The 1st boy invites the 3rd girl.
-The 2nd boy invites the 1st girl.
-The 3rd boy invites no one.
-The 4th boy invites the 2nd girl.
```

### Constraints

- `grid.length == m`
- `grid[i].length == n`
- `1 <= m, n <= 200`
- `grid[i][j]` is either `0` or `1`.

## Hints

### Hint 1

We can see that the problem can be represented as a directed graph with an
edge from each boy to the girl he invited.

### Hint 2

We need to choose a set of edges such that no to source points in the graph
(i.e., boys) have an edge with the same endpoint (i.e., the same girl).

### Hint 3

The problem is maximum bipartite matching in the graph.
