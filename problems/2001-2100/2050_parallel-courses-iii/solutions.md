# Solutions — Parallel Courses III

## Topological Sort with Finish Times

Because unlimited courses can run in parallel, the earliest month a course can finish is its own duration plus the latest finish time among its prerequisites — the longest weighted chain ending at it. This is a longest-path computation on the prerequisite DAG, and it decomposes perfectly over a topological order: when a course's indegree drops to zero, every prerequisite has already been assigned its final finish time, so the course's own finish time is immediately correct.

Kahn's algorithm provides that order. Courses with no prerequisites start at month 0 and finish at their own duration. Each time a course leaves the queue, its outgoing edges relax the tentative finish time of each successor (`finish[course] + time[nxt]` if larger), and the successor's indegree is decremented; when a successor's indegree hits zero it enters the queue with its finish time fully determined. The relaxation must take a maximum rather than an assignment because a course waits for _all_ of its prerequisites, not just the first to complete.

The answer is the maximum finish time over all courses, since finishing everything means finishing the latest-ending chain. An empty `relations` list works unchanged (every course starts immediately), and the problem guarantees the graph is acyclic so the queue always drains.

**Complexity:** `O(V + E)` time, `O(V + E)` space.
