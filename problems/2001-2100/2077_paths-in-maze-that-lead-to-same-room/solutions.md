# Solutions — Paths in Maze That Lead to Same Room

## Orient edges and intersect forward neighbors

Compute every room's degree and order rooms by `(degree, id)`. Direct each corridor from the lower endpoint in that order to the higher endpoint. For every directed edge `u → v`, inspect `u`'s forward neighbors and count those also present in `v`'s forward-neighbor set. In a triangle, exactly its lowest-to-middle edge finds the highest room, so each cycle is counted once.

![On the example maze with corridors [[1,2],[5,2],[4,1],[2,4],[3,1],[3,4]], oriented edge 1 to 2 intersects forward(1) = {2, 4} with forward(2) = {4} at shared room 4, and the accented cycles {1, 2, 4} and {1, 3, 4} give the answer 2.](figures/solution-oriented-neighbor-intersection.svg)

Degree ordering limits the number of forward neighbors any room can contribute to these intersections, avoiding a quadratic scan over all room triples even on dense inputs.

**Complexity:** `O(n + m√m)` time and `O(n + m)` space, where `m = corridors.length`.
