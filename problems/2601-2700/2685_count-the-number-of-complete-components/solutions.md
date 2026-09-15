# Solutions — Count the Number of Complete Components

Both readings first split the vertices into connected components, then ask
of each component whether any of its internal edges is missing; they differ
in the structure that answers those two questions. The traversal builds the
adjacency list outright, floods each component with an explicit stack, and
judges it locally — a component of `k` vertices is fully wired exactly when
every one of its members has degree `k - 1`. Union-find builds no graph at
all: it merges endpoints as the edge list streams past and settles the
question globally, weighing each root's vertex count against the edge tally
deposited on it.

## Component traversal with a degree check

Build the undirected adjacency list first — each edge appended at both ends,
so a walk can cross it in either direction — then sweep the vertices `0`
through `n - 1`. A vertex nobody has claimed yet opens a fresh component,
and one flood from it collects that whole component into a list. The flood
runs on an explicit stack rather than recursion, immune to depth limits, and
marks each neighbor at push time so no vertex is ever stacked twice; every
vertex therefore lands in exactly one component list.

With the component in hand the completeness test is local. A component of
`k` vertices is fully wired exactly when each member is adjacent to all
`k - 1` others — that is, when every member's adjacency list holds `k - 1`
entries. The degree read off the global adjacency list is safe to use as the
in-component degree: every neighbor of a vertex is reachable from it, hence
inside its own component, so no outside edge can inflate the count. The
statement forbids self-loops and repeated edges, which is what makes a
degree of `k - 1` mean `k - 1` distinct partners rather than a padded tally.
A singleton passes vacuously — its lone vertex has degree `0 == k - 1` —
which is why isolated vertices count as fully wired.

**Complexity:** `O(n + m)` time, `O(n + m)` space for the adjacency list,
the visited marks, and the traversal stack.

## Union-find with per-component edge counting

The statement guarantees no repeated edges and `ai != bi`, so a connected
component with `m` vertices is complete exactly when it contains all
`m * (m - 1) / 2` possible edges — holding that many distinct edges forces
every pair to be adjacent. Counting is all that is needed: identify each
component, know its vertex count and its edge count, and compare.

An iterative union-find merges components in one pass over `edges`:
path-halving `find` plus union by size keeps trees flat without a single
recursive call. A second pass then deposits one credit per edge at
`find(a)`, which after all unions is the component's final root — every edge
lands on exactly the root that owns both endpoints, and `size` is read only
at roots where it still names the whole component. Finally each root `v`
(with `find(v) == v`) is judged complete iff
`edge_count[v] == size[v] * (size[v] - 1) / 2`; a singleton root carries
zero edges and satisfies the law vacuously, which is why isolated vertices
count as complete. The answer is the number of roots that pass.

**Complexity:** `O((n + m) α(n))` time, `O(n)` space.
