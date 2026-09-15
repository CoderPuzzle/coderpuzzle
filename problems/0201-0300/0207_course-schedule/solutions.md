# Solutions — Course Schedule

Two cycle tests on the same prerequisite graph: peel it breadth-first with
Kahn's algorithm, or walk it depth-first with a three-color DFS that watches
for a path folding back onto itself.

## kahn

Each prerequisite pair `[a, b]` is a directed edge `b -> a`, and all courses can be finished exactly when this graph has no cycle — a cycle is a set of courses each indirectly requiring itself. The solution detects cycles with Kahn's algorithm: repeatedly remove a node with no remaining incoming edges, and if every node eventually gets removed, the graph is acyclic.

Concretely, the code builds an adjacency list plus an `indegree` count for each course, then seeds a queue with every course whose indegree is already zero (no prerequisites). Each dequeued course counts as "taken"; taking it removes its outgoing edges, so the indegree of each dependent course is decremented, and any dependent that drops to zero joins the queue. Courses inside a cycle never reach indegree zero and are never dequeued.

The check at the end compares the number of courses taken with `numCourses`: if they match, a complete topological order exists and the answer is true; otherwise a cycle trapped the remainder and the answer is false. An empty prerequisite list starts with all courses at indegree zero and trivially succeeds.

**Complexity:** `O(V + E)` time, `O(V + E)` space.

## dfs_cycle

Same graph, opposite direction of attack. Every course carries a color — 0
unvisited, 1 on the current DFS path, 2 fully explored — and the sweep
descends from each unvisited course as far as its edges reach. The tell is
the edge into a course still colored 1: that course is an ancestor of the
very path being walked, so the requirements close into a circle and the
answer is false the moment such a back edge appears.

A course whose whole subtree has been walked turns 2 and is never
re-descended, so shared prerequisites are explored once, not once per
dependent. The walk runs on an explicit stack of (node, next-child-index)
frames — each resuming exactly where it left off and popping once its index
runs past the adjacency list — because a chain-shaped set of prerequisites
would otherwise run the call stack (and Python's default 1000-frame
recursion limit) off the cliff.

If every start finishes without ever meeting a gray neighbor, the graph is
acyclic — no course indirectly requires itself — and every course can be
taken.

**Complexity:** `O(V + E)` time — each course goes gray once and each edge
advances one frame's index. `O(V)` extra space for the color array, plus
the explicit stack, which holds up to `O(V)` frames on a chain-shaped
prerequisite graph.
