# Solutions — Minimum Time to Visit a Cell In a Grid

## Dijkstra with Parity-Aware Waiting

Each move costs one second, so any arrival time at a cell has fixed parity relative to the start — but cells refuse entry before their threshold time. When a cell is blocked, the traveler can waste time by bouncing back and forth across an already-visited edge (2 seconds per round trip), so from a current time `t` the earliest entry into a cell requiring `grid[nr][nc]` is the smallest value `>= max(t + 1, grid[nr][nc])` with the same parity as `t + 1`: if the gap to the threshold is even you enter exactly at the threshold, otherwise one second later.

![Example 1's grid with the optimal route: arrival times 0..7 and the two 1-second bounces between (1,1) and (1,2) that pay for waiting.](figures/solution-parity-wait.svg)

This turns the grid into a shortest-path graph where edge weights still behave uniformly (arrival times are non-decreasing along any route), so Dijkstra applies: pop the cell with the smallest tentative time, relax its four neighbors with the parity-adjusted arrival formula, and keep a `dist` matrix of best-known times. The stale-entry check `t != dist[r][c]` skips outdated heap entries, and the algorithm terminates at the first pop of the bottom-right cell, which is guaranteed minimal.

One global obstruction cannot be waited out: if _both_ neighbors of the top-left cell demand more than 1 second, no move off the start is ever possible (there is nowhere to bounce), so the answer is `-1` immediately — otherwise the answer always exists, since waiting parity eventually admits any cell. The 1x1 grid is a trivial early return of 0. Heap operations bound the work: each cell enters the heap at most once per improvement, giving the usual log-factor over the grid size.

**Complexity:** `O(mn log(mn))` time, `O(mn)` space.
