# Solutions — Grid Teleportation Traversal

## Zero-One BFS with Portal Expansion

Treat every portal of a letter as one big super-node, exactly as hint 1
suggests: stepping on any cell with letter `L` makes all other `L`-cells
reachable at zero cost, but only the first time — afterwards the letter is
spent. Since moves cost 1 and teleports cost 0, the search runs as a BFS in
layers, where layer `d` holds every cell reachable with exactly `d` moves.
Each layer is processed in two phases: first its zero-cost closure, then its
moves. In the closure phase, the first cell of a letter seen anywhere in the
layer claims every unvisited cell of that letter into the same layer (each
letter is entered at most once across the whole run, which hint 2 notes is
harmless since every cell settles once). Only once the closure is complete do
the moves run, pushing unvisited neighbors into layer `d + 1`. The phases
must not be interleaved: a teleport discovered mid-layer can reclassify a
cell that an earlier move already claimed one step too late, so a same-layer
teleport has to beat any same-layer move. The first layer to touch the
bottom-right corner determines the answer; if the corner never settles — it
may be an obstacle, or walled off — the answer is `-1`.

The sweep is otherwise an ordinary grid BFS over the four directions with a
`dist` array that doubles as the visited mark. Portals are collected up front
into 26 per-letter cell lists, so a letter's expansion costs work proportional
to its cells, each scanned exactly once; everything else is `O(1)` per cell.
On a `1 x 1` grid the start is the goal and the answer is `0`, portal
included, since the start cell's letter is processed like any other.

**Complexity:** `O(m · n)` time, `O(m · n)` space.
