# Solutions — Longest Cycle in a Graph

Both solutions draw their speed from the shape that out-degree at most one
forces on every component: a tail draining into a single loop. The peel works
from the outside in — nodes nobody points at can start no cycle, and shaving
them off in waves strands their tails too, until only the loops remain to be
measured. The timestamped walk works from the inside out — it chases
pointers and stamps each node with the moment of first contact, so the
instant a walk bites its own tail, the loop's length is already on record.

## Indegree-Zero Topological Peel

A node that nobody points at cannot lie on a cycle; more is true, cutting it
away can expose another such node, because its out-edge may have been the
last thing keeping its successor fed. So count in-degrees in one pass — an
`edges[i] == -1` points nowhere and counts for nothing — seed a queue with
every node of in-degree zero, and peel: each node leaving the queue drops its
successor's in-degree, and a successor falling to zero joins the queue. When
the queue drains, exactly the cycle nodes survive. None of them can ever fall
to zero, since the predecessor on its ring is never peeled before it; and any
node left standing keeps in-edges only from other survivors, which in a graph
of one-out edges pins the whole remainder onto disjoint rings.

What remains is a set of rings that nothing feeds, so measure them directly:
from each survivor, step around the ring counting nodes, zeroing each node's
in-degree as it is counted — each ring is therefore entered once, and the
walk halts exactly where it started. On `edges = [3,2,1,4,5,3]`, node 0 is
the lone seed; peeling it drops node 3's in-degree from 2 to 1, the queue
drains, and two rings remain — `1 -> 2 -> 1` and `3 -> 4 -> 5 -> 3` — so the
walks report 2 and 3.

The `-1` case is handled where it arises: skipped while counting (a dead end
feeds nobody) and skipped while peeling (it has no successor to notify).
Everything is a flat scan over one array with an explicit queue, so there is
no recursion anywhere — a chain of `10⁵` tail nodes costs nothing on the
stack. `best` keeps `-1` when the peel consumes the whole graph, which is
precisely the acyclic case.

**Complexity:** `O(n)` time, `O(n)` space.

## Timestamped Iterative DFS with Three-Color Tracking

With out-degree at most one, the graph is a set of "rho" shapes: every walk eventually dead-ends at `-1` or falls into a cycle, and each node belongs to at most one cycle. Every cycle is therefore discovered by walking from any node on the chain leading into it, so one traversal per unvisited start node suffices, provided visited nodes are never re-walked.

The canonical solution colors nodes as unvisited (0), on the current path (1), or finished (2), and stamps each node with a global `timer` value when it enters the current path. From each unvisited start, follow `edges` while the next node is unvisited, appending the walk to a `path` list. The walk ends two ways: at `-1` or an already-finished node (no new cycle), or at a node still colored 1 — a node on the current path. That node's position in the walk is known from its timestamp: the cycle length is exactly `timer - step[node]`, the number of steps taken since that node was first reached. After each walk, every path node is recolored 2 so later starts never re-traverse it (they can only re-enter finished territory, which is not a new cycle).

Iterating the outer loop over all nodes with an upfront color check makes the algorithm fully iterative — no recursion, safe for chains of `10^5` nodes — and amortizes to linear time since each node is walked once and finalized once. `best` stays `-1` when every walk dead-ends, and self-loops cannot occur (`edges[i] != i`) though a length-1 cycle would still be handled by the same timestamp difference.

**Complexity:** `O(n)` time, `O(n)` space.
