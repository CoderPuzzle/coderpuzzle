# Solutions — Trapping Rain Water II

## Priority-Queue Flood From the Border

Water cannot rest on any border cell — it would simply spill off the map. So the water level above every interior cell is dictated by the lowest barrier on some path from that cell to the border. This suggests processing cells in order of the lowest barrier encountered so far, which is exactly what a min-heap provides.

The solution seeds a min-heap with every border cell (marked visited) and then repeatedly pops the lowest cell on the frontier. When the cell of height `h` is the minimum of the frontier, no undiscovered cell can hold water above `h` — any path from such a cell to the outside must cross the frontier somewhere at least as high as `h`. Each unvisited neighbor is therefore settled once and for all: if its own height is below `h`, it traps exactly `h - nh` units (water fills up to the popped level); otherwise it traps nothing and becomes a new barrier.

![The example height map with the border ring dashed (the initial heap) and the three interior water cells tinted: depths +1, +2, and +1, for a total of 4 trapped units.](figures/solution-border-heap.svg)

Crucially, the neighbor is pushed back onto the heap with height `max(h, nh)`, not its terrain height. The heap entries thus represent the effective water-plus-terrain level, so the frontier always tracks the running spill level as it moves inland, and each newly popped cell is the true next-lowest point where water could overflow.

Each cell is pushed and popped exactly once, so the walk over the `m x n` map does constant work per cell plus heap operations. A single row or column (no interior) traps nothing, which falls out naturally since every cell starts on the frontier and no neighbor is ever unvisited.

**Complexity:** `O(mn log(mn))` time, `O(mn)` space.
