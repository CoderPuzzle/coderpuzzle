# Minimum Time to Reach Target With Limited Power

## Description

You are given a directed weighted graph with n nodes labeled from 0 to n - 1.

The graph is represented by a 2D integer array edges, where edges[i] = [ui, vi, ti] indicates a directed edge from node ui to node vi that takes ti seconds to traverse.

You are also given an integer power representing the initial available power, and an integer array cost of length n, where cost[u] represents the power required to forward the signal from node u through any one of its outgoing edges.

You are given two integers source and target.

The signal starts at source at time 0 with power units of power and follows these rules:

- The signal may traverse a directed edge from node u only if the remaining power is at least cost[u].
- No power is consumed when the signal arrives at a node, unless it later leaves that node by traversing another edge.
- When the signal is forwarded from node u, the remaining power is decreased by cost[u] units.
- Traversing an edge edges[i] = [ui, vi, ti] increases the total time by ti seconds.

Return an integer array answer of size 2, where:

- answer[0] is the minimum time required for the signal to reach node target.
- answer[1] is the maximum remaining power among all paths that achieve answer[0].

If the signal cannot reach target, return [-1, -1].

### Example 1

![diagram](figures/3977-1.svg)

```text
Input: n = 5, edges = [[0,1,1],[1,4,1],[0,2,1],[2,3,1],[3,4,1]], power = 4, cost = [2,3,1,1,1], source = 0, target = 4

Output: [3,0]

Explanation:

    The signal starts at node 0 with 4 units of power.
    The path 0 -> 1 -> 4 is not valid, because after leaving node 0, the signal has 2 units of power remaining, which is less than cost[1] = 3.
    The valid path 0 -> 2 -> 3 -> 4 takes a total time of 3.
    The total power consumed along this path is cost[0] + cost[2] + cost[3] = 4, leaving 0 remaining power.
    Hence, the answer is [3, 0].
```

### Example 2

![diagram](figures/3977-2.svg)

```text
Input: n = 3, edges = [[0,1,2],[1,2,2],[2,0,2]], power = 3, cost = [1,1,1], source = 1, target = 1

Output: [0,3]

Explanation:

    Since the source and target are the same node, no traversal is required.
    Hence, the minimum total time taken is 0, and no power is consumed.
    Therefore, the answer is [0, 3].
```

### Example 3

![diagram](figures/3977-3.svg)

```text
Input: n = 4, edges = [[0,1,3],[2,3,4]], power = 3, cost = [1,1,1,1], source = 0, target = 3

Output: [-1,-1]

Explanation:

There is no valid path from source to target, therefore return [-1, -1].
```

### Constraints

- `1 <= n <= 1000`
- `0 <= edges.length <= 1000`
- `edges[i] = [uᵢ, vᵢ, tᵢ]`
- `0 <= uᵢ, vᵢ <= n - 1`
- `1 <= tᵢ <= 10⁹`
- `1 <= power <= 1000`
- `cost.length == n`
- `1 <= cost[i] <= 2000`
- `0 <= source, target <= n - 1`

## Hints

### Hint 1

Treat the remaining power as part of the state.

### Hint 2

Use Dijkstra's algorithm on states (node, remainingPower).

### Hint 3

From state (u, p), you may traverse outgoing edges only if p >= cost[u], and the next state has remaining power p - cost[u].

### Hint 4

After computing shortest times, among all states at target with minimum time, choose the one with the maximum remaining power.
