# Solutions — Minimum Path Cost in a Hidden Grid

## Explore with DFS, then Dijkstra

The problem splits into two phases: first learn the entire reachable portion of the grid through the oracle, then run an ordinary shortest-path computation on what was learned. All coordinates are kept relative to the start at `(0, 0)`, since the actual position of the grid is irrelevant — only connectivity and costs matter. Each discovered cell records the cost of stepping onto it (exactly what `move` reports), and the cell where `isTarget()` fires is remembered; the start cell itself gets cost 0 because its cost is never paid.

Exploration is an iterative DFS that keeps the robot physically on the DFS tree. Each stack frame holds a cell and an index into the direction list; whenever an unvisited neighbor passes `canMove`, the robot moves there (recording the returned cost), checks `isTarget()`, and pushes a new frame. When a frame runs out of directions it is popped and the robot moves back the way it came (the `back` map of opposite directions), so it always stands on the cell the algorithm is reasoning about. Every reachable cell is entered exactly once, and the `cost` dictionary ends up describing the full weighted graph.

With the map known, Dijkstra finds the cheapest route from `(0, 0)` to the remembered target cell: popping `(d, r, c)` from the heap, skipping stale entries, and relaxing each neighbor's tentative distance with `d + cost(neighbor)`. If the DFS never saw the target, no route exists and the answer is `-1`.

Blocked cells never enter the map (they fail `canMove`), and the query budget of 1,000,000 is comfortable: a 100 x 100 grid costs a handful of `canMove` probes per cell plus one move out and one move back per tree edge.

**Complexity:** `O(mn log(mn))` time, `O(mn)` space.
