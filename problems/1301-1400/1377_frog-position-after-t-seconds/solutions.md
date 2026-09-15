# Solutions — Frog Position After T Seconds

## Approach: BFS over levels with per-vertex probability

Root the tree at vertex 1 and run a level-by-level BFS that carries, for each
vertex reached, the probability the frog is there. A vertex's probability
splits equally among its unvisited (child) neighbors; a leaf keeps its
probability forever, since the frog stays put. Two cases produce a non-zero
answer at `target`: the frog arrives in exactly `t` jumps (probability carried
at depth `t`), or it arrived earlier and got stuck on `target` — `target` is a
leaf and its depth is at most `t`. Any other situation has probability zero.

**Complexity:** `O(n)` time and space for `n` vertices (`t <= 50` never
exceeds the tree height walked by BFS).
