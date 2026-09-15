# Network Delay Time

## Description

You are given a network of `n` nodes, labeled from `1` to `n`. You are also
given `times`, a list of travel times as directed edges
`times[i] = (ui, vi, wi)`, where `ui` is the source node, `vi` is the target
node, and `wi` is the time it takes for a signal to travel from source to
target.

We will send a signal from a given node `k`. Return the minimum time it takes
for all the `n` nodes to receive the signal. If it is impossible for all the
`n` nodes to receive the signal, return `-1`.

### Example 1

```text
Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
Output: 2
```

![The signal leaves node 2 at t = 0 and reaches nodes 1 and 3 at t = 1 and node 4 at t = 2.](figures/example-1.svg)

### Example 2

```text
Input: times = [[1,2,1]], n = 2, k = 1
Output: 1
```

### Example 3

```text
Input: times = [[1,2,1]], n = 2, k = 2
Output: -1
```

### Constraints

- `1 <= k <= n <= 100`
- `1 <= times.length <= 6000`
- `times[i].length == 3`
- `1 <= ui, vi <= n`
- `ui != vi`
- `0 <= wi <= 100`
- All the pairs `(ui, vi)` are unique (no multiple edges).

## Hints

### Hint 1

This is a single-source shortest path problem: the answer is the maximum over all nodes of the shortest distance from node k.

### Hint 2

Dijkstra's algorithm with a min-heap computes the earliest arrival time at every node.

### Hint 3

If some node is never reached, return -1.
