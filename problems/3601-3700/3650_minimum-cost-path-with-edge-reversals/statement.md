# Minimum Cost Path with Edge Reversals

## Description

You are given a directed weighted graph with `n` nodes labeled from `0` to
`n - 1`, and an array `edges` where `edges[i] = [uᵢ, vᵢ, wᵢ]` denotes a
directed edge from node `uᵢ` to node `vᵢ` that costs `wᵢ` to traverse.

Every node carries a switch that can be used at most once. When you arrive
at a node whose switch is still unused, you may point the switch at one of
that node's incoming edges `vᵢ -> uᵢ`: the edge reverses into `uᵢ -> vᵢ`, you
traverse it immediately at a cost of `2 * wᵢ`, and the reversal is spent — it
covers that single move only, and the switch can never be used again.

Return the minimum total cost to travel from node `0` to node `n - 1`, or
`-1` if node `n - 1` cannot be reached.

### Example 1

![diagram](figures/3650-1.svg)

```text
Input: n = 4, edges = [[0,1,3],[3,1,1],[2,3,4],[0,2,2]]
Output: 5
Explanation: Take the edge 0 -> 1 at a cost of 3. Node 1 still has an unused
switch, and one of its incoming edges is 3 -> 1: flip that edge into 1 -> 3
and traverse it right away for 2 * 1 = 2. The total cost is 3 + 2 = 5.
```

### Example 2

```text
Input: n = 4, edges = [[0,2,1],[2,1,1],[1,3,1],[2,3,3]]
Output: 3
Explanation: No switch is needed. Travel 0 -> 2 (cost 1), then 2 -> 1
(cost 1), then 1 -> 3 (cost 1) for a total cost of 1 + 1 + 1 = 3.
```

### Constraints

- `2 <= n <= 5 * 10⁴`
- `1 <= edges.length <= 10⁵`
- `edges[i].length = 3`
- `0 <= uᵢ, vᵢ <= n - 1`
- `1 <= wᵢ <= 1000`

## Hints

### Hint 1

Do we only need to reverse at most one edge for each node? If so, can we add
reversed edges for each node and use the one that helps in the shortest path?

### Hint 2

Add reverse edges `{u, v, w} -> {v, u, 2 * w}`, and use Dijkstra.
