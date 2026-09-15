# Solutions — Shortest Path in a Hidden Grid

## Explore with DFS, then BFS

The problem splits into two phases: first learn the entire reachable portion of the grid through the oracle, then run an ordinary shortest-path computation on what was learned. All coordinates are kept relative to the start at `(0, 0)`, since the actual position of the grid is irrelevant — only connectivity matters. Every newly entered cell is recorded in a `seen` set, and the cell where `isTarget()` fires is remembered; because the start and target differ, that discovery always happens on a cell other than the origin.

Exploration is an iterative DFS that keeps the robot physically on the DFS tree. Each stack frame holds a cell and an index into the direction list; whenever an unseen neighbor passes `canMove`, the robot moves there, checks `isTarget()`, and pushes a new frame. When a frame runs out of directions it is popped and the robot moves back the way it came (the `back` map of opposite directions), so it always stands on the cell the algorithm is reasoning about. Every reachable cell is entered exactly once, and the `seen` set ends up describing the full unweighted graph.

With the map known and every edge of length 1, breadth-first search from the origin is exactly the shortest-path algorithm: the first time the frontier reaches the remembered target cell, its distance is final. If exploration never saw the target, the target is outside the reachable component and the answer is `-1`.

The query budget is comfortable because exploration is thrifty: each cell costs at most four `canMove` probes, one `isTarget`, one move in and one move back — under ten queries per cell, so even a fully open 500 x 500 grid stays an order of magnitude below the 4,000,000-call budget. The Java port encodes `(r, c)` pairs as a single `long` key with an offset that keeps relative coordinates positive.

**Complexity:** `O(mn)` time and space for exploration plus BFS, with at most a constant number of oracle queries per cell.
