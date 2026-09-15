# Solutions — Parallel Courses

## Layered Topological Sort (Kahn's Algorithm)

The minimum number of semesters is the length of the longest chain of prerequisites: a course can run in semester `t` exactly when every prerequisite finished by semester `t - 1`, so courses at depth `d` in the prerequisite DAG cannot start before semester `d + 1`, and scheduling all depth-`d` courses together in semester `d + 1` achieves that bound. Kahn's algorithm computes these depths level by level, which is precisely a semester schedule.

Build the adjacency list from each `relations` pair and count each course's indegree (number of unfinished prerequisites). The first queue holds all courses with indegree 0 — those available in semester 1. Each iteration of the outer loop drains the entire current queue as one semester: every drained course is counted as taken, and for each successor the indegree drops by one; a successor reaching indegree 0 joins the queue for the next semester. Draining the queue a full level at a time (snapshotting its length before popping) is what makes `semesters` count rounds rather than individual courses.

If the prerequisite graph contains a cycle, the courses on it never reach indegree 0, the queue empties early, and the count of taken courses falls short of `n` — that is the `-1` case. The acyclic case ends with every course taken, and the number of levels drained is the answer. Both the Python and Java reference solutions implement this identical layered BFS.

Each course enters the queue exactly once and each of the `E = len(relations)` relations is relaxed exactly once.

**Complexity:** `O(n + E)` time, `O(n + E)` space.
