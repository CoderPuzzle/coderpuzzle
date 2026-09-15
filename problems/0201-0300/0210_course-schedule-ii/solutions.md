# Solutions — Course Schedule II

Two ways to produce a topological order of the prerequisite graph: Kahn's
layer-by-layer peel, or a three-color DFS read out in reverse postorder.

## kahn

A valid course order is exactly a topological ordering of the directed graph where each pair `[a, b]` is the edge `b -> a`. Kahn's algorithm produces such an ordering — or proves none exists — by repeatedly emitting a course whose prerequisites have all been emitted, which is precisely the definition of a legal next course.

The code builds an adjacency list and an `indegree` array (the number of unfinished prerequisites per course), then seeds a queue with all courses at indegree zero. Each dequeued course is appended to `order`, and its edges are "consumed" by decrementing the indegrees of the courses that depend on it; any course that falls to zero becomes available and joins the queue. This layer-by-layer peeling guarantees every course is emitted only after all of its prerequisites, and the flexibility in which zero-indegree course to take next is why multiple correct orders exist.

![The prerequisite graph of example 2 (0 -> 1, 0 -> 2, 1 -> 3, 2 -> 3) with each node's indegree, and the four peeling steps that drain the queue into the order [0, 1, 2, 3].](figures/solution-kahn-peeling.svg)

If the graph contains a cycle, the courses on it keep positive indegrees forever and never enter the queue, leaving `order` shorter than `numCourses`; in that case the function returns an empty list, as the problem requires, rather than a partial order. When the loop drains every course, the collected order is a complete valid answer.

**Complexity:** `O(V + E)` time, `O(V + E)` space.

## dfs_cycle

Kahn's algorithm emits a course the moment its prerequisites are done; this
variant builds the order from the other end. A three-color DFS (0 unvisited,
1 on the current path, 2 fully explored) walks each prerequisite chain to
its end, and a course is appended to a list exactly when it turns black —
that is, once everything downstream of it has already been appended.
Meeting a neighbor still colored 1 is a back edge, and the function returns
the empty list the problem demands instead of a partial order.

That appended list is a postorder, so it is backwards: every course sits
after all of its dependents. Reversing it flips the picture — each
prerequisite lands before the courses depending on it, which is precisely a
topological order, assembled deepest-first rather than layer by layer. The
walk runs on an explicit stack of (node, next-child-index) frames, each
resuming where it left off, so a chain-shaped set of prerequisites cannot
exhaust the call stack.

**Complexity:** `O(V + E)` time — every edge advances one frame's index
once. `O(V)` extra space for the color array and the postorder, plus the
explicit stack's worst-case `O(V)` frames on a chain-shaped prerequisite
graph.
