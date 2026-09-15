# Solutions — Count Unreachable Pairs of Nodes in an Undirected Graph

Both methods pin the answer to the same fact: mutual reachability in an
undirected graph is an equivalence whose classes are the connected
components, so of the `C(n, 2)` pairs of distinct nodes exactly the
within-component ones `Σ C(s_i, 2)` can reach each other, and the
difference counts the stranded pairs. The BFS flood walks that
equivalence out directly — materialise the adjacency, flood one component
per unvisited seed, read its size off the frontier array. The union-find
run never builds the graph at all: it grows the components edge by edge
through an incremental merge structure and pays an almost-constant
`α(n)` per edge, keeping its working memory at `O(n)`.

## Iterative BFS component enumeration

The components are sitting in the graph waiting to be walked out, and a
breadth-first flood collects each one whole: start at any
still-unvisited node, everything the frontier reaches is that node's
component, and nothing outside it ever will be. The code first
materialises the adjacency — each edge is recorded at both endpoints,
since it is walkable in both directions — then scans the nodes `0` to
`n - 1`; every unvisited node met there seeds one flood, so each
component is discovered exactly once, at its first-scanned member.

The frontier lives in a flat array with a read cursor: appending is the
push, advancing the cursor the pop, and the entries beyond the cursor are
the frontier still owed a look at their neighbours. A node is marked
visited when it is enqueued — not when it is dequeued — which is what
keeps every node in the array exactly once even though many of its
neighbours may offer it. The walk is iterative end to end on purpose: a
path-shaped component at `n = 10^5` would nest 10^5 recursive frames,
and the fixed-stack languages refuse (Python raises `RecursionError`,
Java throws `StackOverflowError`); the cursor replaces the stack.

By the time the cursor catches the tail, the array holds precisely the
seed's component, so its length is the size `s` — the flood counts while
it walks, no second pass needed. `C(s, 2)` of the pairs among those
nodes are mutually reachable; summing over all floods and subtracting
from `C(n, 2)` leaves every unreachable pair counted exactly once. An
edge-free input floods `n` components of size 1 and returns `C(n, 2)`,
while the all-ones cycle of Example 1 floods once and returns 0. The
counts approach `5 * 10^9` at `n = 10^5`, so the fixed-width languages
accumulate in 64-bit arithmetic (Python's integers are unbounded).

**Complexity:** `O(n + E)` time, `O(n + E)` space.

## Union-Find and Component-Size Complement Counting

Reachability in an undirected graph is an equivalence: two nodes are mutually reachable exactly when they lie in the same connected component. So the unreachable pairs are all pairs minus the pairs within components. Counting directly per node (each node in a component of size `s` has `n - s` unreachable partners) double counts each pair, so the cleaner formulation is `C(n, 2) - Σ C(s_i, 2)` over component sizes `s_i` — every within-component pair is reachable, every cross-component pair is not, and each pair is counted exactly once.

The components come from a union-find over the edge list, using union by size so trees stay shallow, and an iterative `find` with path compression (a first pass locates the root, a second rewires every visited node directly to it) so repeated finds are nearly constant time and no recursion stack is used. Unioning an edge first resolves both endpoints' roots and merges the smaller component into the larger, tracking `size[root]` as the component's node count.

After all edges are merged, every component is represented by a root with `find(v) == v`; summing `size[v] * (size[v] - 1) / 2` over these roots gives the reachable pair count, subtracted from the total `n * (n - 1) / 2`. Edge cases: with no edges every node is its own root and the answer is `C(n, 2)`; a fully connected graph yields 0; counts use Python's unbounded integers (in fixed-width languages this needs 64-bit, since the count can approach `5 * 10^9` for `n = 10^5`).

**Complexity:** `O(E α(n))` time, `O(n)` space.
