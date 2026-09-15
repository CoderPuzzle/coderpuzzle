# Solutions — Detect Cycles in 2D Grid

## DFS with parent tracking

Each maximal same-letter region is its own little graph, where an edge joins
two grid-adjacent cells that share a letter. A cycle in `grid` is exactly a
cycle in one of these regions, so the search walks each region once and asks
the standard question for an undirected graph: does discovering a neighbor
that is already visited — and is not the cell you just stepped from — ever
happen? If it does, that neighbor was reached by two different routes from
the region's starting cell, and those two routes plus the closing edge form
a loop of length four or more.

The walk uses an explicit stack rather than the call stack, because a region
can cover the entire grid — up to `500 * 500` cells — and a plain recursive
DFS would need one stack frame per cell on its deepest path, risking a stack
overflow long before the region is fully explored. Each stack entry carries
a cell together with the cell it was reached from. A neighbor is skipped
outright when it is that parent cell (a same-cell reversal is not a cycle);
otherwise, if the neighbor is already marked visited, the search returns
`true` immediately. Crucially, cells are marked visited at the moment they
are pushed, not when they are popped: this is what keeps the check correct
under the stack's last-in-first-out order — a cell only ever gets a single
"discoverer", so any later route that reaches it necessarily closes a real
loop rather than racing an unprocessed sibling. The scan over the grid tries
every unvisited cell as a fresh region seed, and the whole grid is
`false` only once no seed anywhere produces a cycle.

**Complexity:** `O(m·n)` time — every cell is pushed onto the stack at most
once, and each of its incident edges is examined a constant number of times.
`O(m·n)` extra space for the visited grid and, in the worst case (one region
spanning the whole grid), for the stack.
