# Determine if a Simple Graph Exists

## Description

You are given an integer array `degrees` of length `n`, where `degrees[i]` is
the desired degree of vertex `i`.

Decide whether some undirected simple graph on the vertices `0` through
`n - 1` realizes exactly these degrees. A simple graph has no self-loops and
at most one edge between each pair of distinct vertices.

Return `true` if such a graph exists, or `false` otherwise.

### Example 1

![diagram](figures/3656-1.svg)

```text
Input: degrees = [3,1,2,2]
Output: true
Explanation: One possible graph uses the edges (0,1), (0,2), (0,3) and
(2,3), giving degrees 3, 1, 2 and 2 respectively.
```

### Example 2

```text
Input: degrees = [1,3,3,1]
Output: false
Explanation: Vertices 1 and 2 would each have to be adjacent to every other
vertex, forcing vertices 0 and 3 to have degree at least 2, but both are 1.
```

### Constraints

- `1 <= n == degrees.length <= 10⁵`
- `0 <= degrees[i] <= n - 1`

## Hints

### Hint 1

Use the Erdős–Gallai theorem.
