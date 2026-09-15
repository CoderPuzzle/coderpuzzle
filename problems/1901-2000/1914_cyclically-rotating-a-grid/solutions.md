# Solutions — Cyclically Rotating a Grid

## Ring peel and rotate

Each concentric layer is an independent cycle, so the rotation factorizes: peel
one layer at a time, rotate it in isolation, and write it back. Because `m` and
`n` are both even, the `min(m, n) / 2` rings exactly tile the matrix — every
cell belongs to precisely one ring, and the output matrix is fully determined
by the rings.

A layer is walked counter-clockwise starting at its top-left corner: down the
left edge, right along the bottom, up the right edge, and left along the top.
The statement's rotation — every element takes its counter-clockwise
neighbour's place — is then just a cyclic right-shift of this walked ring.
Since a ring of length `L` returns to itself after `L` steps, only
`k % L` positions of shift matter, which is what keeps `k` up to `10⁹` cheap:
no step is ever simulated, each destination cell reads its source cell through
one modular index.

Each cell is visited a constant number of times per layer, so the whole pass is
linear in the matrix size, with the ring position list as the only scratch.

**Complexity:** `O(m·n)` time, `O(m·n)` space.
