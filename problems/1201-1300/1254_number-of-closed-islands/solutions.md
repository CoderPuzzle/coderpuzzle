# Solutions — Number of Closed Islands

## Flood Fill with Boundary Detection

The key insight is that an island fails to be closed only when some part of it touches the grid border. A single flood fill per island can therefore both erase it and report whether it ever stepped off the grid: walking from any land cell through its 4-connected neighborhood, any attempt to move outside the rows or columns marks the whole component as open.

![The example grid: the ringed island and the lone (3, 6) cell are closed, the border-spilling land is not.](figures/solution-closed-islands.svg)

The scan visits every cell of the `r × c` grid; when an unvisited land cell (`0`) is found, a flood fill starts there and converts every reachable land cell to water (`1`) as it goes, so the fill doubles as the visited marker and each island is processed exactly once. The fill is iterative, driven by an explicit stack, so long snake-shaped islands cannot overflow the recursion stack. The `closed` flag is set when the fill pops a cell whose neighbor lies out of bounds — meaning the component reaches the border and cannot be surrounded by water.

Because erased cells are written back as water, later scans never revisit them, and the border test only ever fires for cells actually on the component's frontier. An island surrounded entirely by `1`s never attempts an out-of-bounds step, so its fill returns `True` and the counter increments. A grid with no land at all simply finds nothing to flood and returns 0.

**Complexity:** `O(r · c)` time, `O(r · c)` space.
