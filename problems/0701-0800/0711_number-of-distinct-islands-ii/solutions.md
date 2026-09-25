# Solutions — Number of Distinct Islands II

## Flood fill with a dihedral shape signature

Two islands count once exactly when one can be carried onto the other by a
shift, a quarter, half, or three-quarter turn, or a left/right or up/down
reflection — and composing a rotation with a reflection only adds the two
diagonal reflections. Those eight maps are the whole symmetry group of the
square, so every island needs a name that forgets both its position and which
of the eight orientations its copy sits in.

When the row-major scan lands on unvisited land, an explicit-stack flood fill
walks the whole island — marking cells as they are pushed so nothing enters
the stack twice — and collects the island's cells. For each of the eight maps
the cells are re-seated: every cell is sent through the transform, the image
is translated so its topmost row and leftmost column sit at the origin, and
the normalized cells are sorted. The lexicographically smallest of the eight
sorted lists becomes the signature. Equivalent islands generate the same eight
images and therefore the same smallest one; inequivalent islands share no
image at all, so their minima differ, and the answer is the size of the hash
set holding one signature per island.

![Flooding Example 1's grid, the L at (0,0)/(0,1)/(1,0) and the L at (2,4)/(3,3)/(3,4) are 180° rotations whose eight dihedral images share the lexicographically smallest normalized shape [(0,0), (0,1), (1,0)], so the answer is 1.](figures/solution-dihedral-min-signature.svg)

Each cell of the grid is pushed at most once across all fills, and an island
of k cells costs eight transformed copies at k log k each to sort — bounded
over all islands by O(m·n log(m·n)) — while the marks, the stacks, and the
signatures all stay within one copy of the grid.

**Complexity:** `O(m·n log(m·n))` time, `O(m·n)` space.
