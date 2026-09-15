# Solutions — Number Of Ways To Reconstruct A Tree

A pair names two nodes and refuses to say which is the ancestor, so
reconstructing the tree means orienting every pair at once — and the count
only ever comes back as 0, 1, or 2. The single solution below recovers
each node's parent straight from the adjacency sets and reads the verdict
off the degrees.

## Place by degree, test containment

Build each value's adjacency set and sort the values by degree,
descending. The root pairs with every other value, so the largest degree
must be exactly V − 1 — one short means no universal root and 0 ways.
Then place the values one at a time in that order: when v's turn comes,
its already-placed neighbors are precisely the neighbors whose degree is
at least v's, and in any valid tree such a neighbor is an ancestor of v
(a strictly smaller descendant would need a strictly smaller degree, and
an equal one is the swappable equal case). The smallest-degree placed
neighbor is therefore the deepest ancestor — v's parent. Containment
must then hold: every other neighbor of v is a neighbor of the parent,
because an ancestor's pair set swallows the child's whole ancestry and
descent. A v with no placed neighbor, or a neighbor outside the parent's
adjacency, proves no tree realizes the pairs: 0.

The verdicts fall out of the degrees. A parent whose degree equals the
child's has an adjacency set differing from the child's exactly by the
two nodes themselves, so flipping that one edge leaves every pair intact
— a second tree, hence 2 (and once any tree exists, such a swap always
exists precisely when some edge joins equal degrees). Otherwise every
edge's orientation is forced: each node's ancestor chain is fixed by
degree, so all valid trees share one parent map — and when every
containment passes, that map realizes the pairs exactly, giving 1.
Values are bounded by 500, so the adjacency rides as a 501 × 501
boolean table indexed by the values themselves (a dict of sets in
Python), and the pass is two 500-wide scans per node.

**Complexity:** `O(p + V^2)` time, `O(V^2)` space.
