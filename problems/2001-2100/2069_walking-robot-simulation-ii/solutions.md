# Solutions — Walking Robot Simulation II

## Index the perimeter

Number the perimeter cells in travel order, starting at `(0, 0)`, moving east along the bottom, then north, west, and south. Store only the current index; `step(num)` adds `num` modulo the perimeter length, and the index ranges along the four edges map directly to coordinates and arrival directions.

One extra flag distinguishes the initial state from a completed lap. Both have perimeter index zero, but the untouched robot faces East while a robot that has moved a positive whole number of laps arrives at `(0, 0)` facing South. All other perimeter indices have a unique arrival direction determined by their edge.

**Complexity:** `O(1)` time per operation and `O(1)` space.
