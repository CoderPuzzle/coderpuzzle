# Solutions — Last Moment Before All Ants Fall Out of a Plank

## Ant Passing-Through Symmetry

The physical picture of ants bouncing off one another is a distraction. When two ants meet and both reverse direction, the resulting configuration is indistinguishable from the two ants having walked straight through each other while swapping identities: the same positions are occupied and the same set of directions is in play. The question asks only when the last ant leaves the plank — a property of occupied positions, not of which ant is which — so the collisions can be ignored entirely.

Under pass-through semantics each ant simply walks to the end it was already facing and falls off. An ant at position p moving left needs p seconds; one moving right needs n - p seconds. The moment the plank empties is the maximum of these waiting times over all ants, which the solution computes with two linear scans — one over the left-movers, one over the right-movers — starting from zero.

What would otherwise demand a collision-by-collision simulation becomes a single maximization: the answer depends only on each ant's starting position and direction, never on the interleaving of meetings. The two input lists may be empty individually, but at least one ant exists, so the maximum is well defined.

**Complexity:** `O(L + R)` time, `O(1)` space.
