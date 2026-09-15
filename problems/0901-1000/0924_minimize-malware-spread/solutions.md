# Solutions — Minimize Malware Spread

## Union-find over the saved-component structure

The malware starts at every node of `initial` at once and floods each
connected component it touches in full, so the final infected set is exactly
the union of the components holding at least one initial node. That reduces
`M(initial)` to a per-component fact: a component's nodes are infected if and
only if it contains an initial node, and removing one initial node only
changes that verdict when it was the component's sole source — in that case
the whole component is spared; otherwise some other source keeps it infected,
and even the removed node can be reinfected through its neighbors.

An iterative union-find with path halving and union-by-size merges every pair
`i`, `j` with `graph[i][j] == 1`, so each root's size is its component's node
count. Counting initial nodes per root then classifies every candidate: a node
in a component with exactly one initial node saves that component's size, and
a node sharing its component with another initial node saves nothing. The
answer is the candidate with the largest save, ties going to the smallest node
index; when no component is saveable every candidate saves zero, and the same
smallest-index rule returns the smallest node of `initial`.

Each of the `n(n - 1) / 2` matrix cells is examined once to drive one `find`
pair, and the two passes over `initial` are linear, all on arrays of `n`
entries.

**Complexity:** `O(n²)` time, `O(n)` space.
