# Solutions — Maximum Number of Fish in a Grid

## Flood fill from every unvisited water cell

The fisher can only move between orthogonally adjacent water cells, so the
grid splits into connected components — every component is exactly the set
of cells reachable from any one of its members, and the total catch there
is the sum of its fish. Scanning every cell and launching one flood fill
per unvisited water cell therefore totals each component once and nothing
else; the answer is the best total seen (zero when the grid holds no water
at all).

![On grid [[0,2,1,0],[4,0,0,3],[1,0,0,4],[0,3,2,0]], the fill from (1,3)
walks its component cell by cell to a running total of 3 + 4 = 7, while
the other components stay untouched at 3, 5 and 5.](figures/solution-flood-fill-richest-component.svg)

Each fill uses an explicit stack rather than recursion, marking cells
visited at push time so no cell enters the stack twice. Totals are small —
at most 100 cells with ten fish each — so plain 32-bit arithmetic carries
every intermediate sum.

**Complexity:** `O(m * n)` time, `O(m * n)` space.
