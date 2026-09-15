# Path with Maximum Probability

## Description

You are given an undirected weighted graph of `n` nodes (0-indexed),
represented by an edge list where `edges[i] = [a, b]` is an undirected
edge connecting nodes `a` and `b` with a probability of success of
traversing that edge `succProb[i]`.

Given two nodes `start_node` and `end_node`, find the path with the
maximum probability of success to go from `start_node` to `end_node`,
and return its success probability.

If there is no path from `start_node` to `end_node`, return `0`. Your
answer will be accepted if it differs from the correct answer by at most
`1e-5`.

### Example 1

![diagram](figures/1514-1.svg)

```text
Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start_node = 0, end_node = 2
Output: 0.25000
Explanation: There are two paths from start_node to end_node, one having
a probability of success 0.2 and the other 0.5 * 0.5 = 0.25.
```

### Example 2

![diagram](figures/1514-2.svg)

```text
Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start_node = 0, end_node = 2
Output: 0.30000
```

### Example 3

![diagram](figures/1514-3.svg)

```text
Input: n = 3, edges = [[0,1]], succProb = [0.5], start_node = 0, end_node = 2
Output: 0.00000
Explanation: There is no path between 0 and 2.
```

### Constraints

- `2 <= n <= 10⁴`
- `0 <= start_node, end_node < n`
- `start_node != end_node`
- `0 <= a, b < n`
- `a != b`
- `0 <= succProb.length == edges.length <= 2 × 10⁴`
- `0 <= succProb[i] <= 1`
- There is at most one edge between every two nodes.

## Hints

### Hint 1

Multiplying probabilities will result in precision errors.

### Hint 2

Take log probabilities to sum up numbers instead of multiplying them.

### Hint 3

Use Dijkstra's algorithm to find the minimum path between the two nodes
after negating all costs.
