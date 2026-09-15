# Solutions — Shortest Distance to a Character

Each cell wants the distance to the nearest occurrence of `c`, which is the
minimum of two one-sided distances: how far the closest `c` at or before it
sits, and how far the closest `c` at or after it sits. Finding the true
nearest for every cell by scanning outward is quadratic in the worst case,
but each one-sided distance is a running quantity a single sweep can carry.

## Nearest c from both directions

Sweep forward remembering the index of the last `c` seen; every cell's
candidate is its index minus that last index. Then sweep backward carrying
the next `c` index instead, and keep that candidate only where it beats what
the forward pass wrote. Both sweeps seed their cursor with sentinels (`-n`
and `2n`) so that before the first — and after the last — occurrence the
candidate is a distance no real neighbour can lose to, and the guarantee that
`c` occurs at least once means every cell ends up with at least one true
distance. A cell holding `c` itself writes 0 from both sides.

**Complexity:** `O(n)` time, `O(n)` space — the output array itself; beyond
it only the two integer cursors.
