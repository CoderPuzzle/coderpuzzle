# Solutions — Find All Groups of Farmland

## Iterative BFS flood fill with component bounds

Every group is a 4-directionally connected rectangle of farmland and the
groups are separated by at least one forested cell, so a flood fill visits each
group as one component. Starting an iterative BFS from every unvisited `1`
cell, the search floods the whole component while recording the smallest and
largest row and column it has seen; for a rectangular group those four extremes
are exactly its top-left and bottom-right corners.

The code scans the matrix row by row. When a farmland cell has not been marked
yet, it seeds a queue and runs the flood. Each dequeued cell relaxes the four
running bounds and pushes any unvisited `1` neighbor in the four cardinal
directions. When the queue drains, the component's `[minR, minC, maxR, maxC]`
is appended and the outer scan continues; cells already reached by a previous
flood are skipped, so every group is emitted exactly once.

The `seen` grid keeps the traversal linear — each cell is enqueued at most once
and the four-neighbour checks cost constant work per visit. An iterative queue
(not recursion) keeps the search safe on the full 300 x 300 grid. Because the
statement allows any output order, the returned list is compared as a set.

**Complexity:** `O(m * n)` time, `O(m * n)` space.
