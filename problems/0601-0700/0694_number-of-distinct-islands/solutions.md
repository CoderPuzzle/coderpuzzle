# Solutions — Number of Distinct Islands

## Flood fill with a translated shape signature

Two islands count once exactly when a pure shift carries one onto the other, so
every island needs a name that records its shape and forgets its position. A
translation moves no cell relative to any other, so subtracting one anchor cell
from every member leaves identical offsets for every translated copy — and
different offsets for any shape that is not a translate, because the offsets
are the island's own cells, merely re-seated at the origin.

The anchor is the first cell of the island that the row-major scan meets: the
leftmost cell of the island's topmost row, the same cell of the shape every
time no matter where the copy sits. When the scan lands on unvisited land, an
explicit-queue flood fill walks the whole island — marking cells as they are
enqueued so nothing enters the queue twice — and records each visited cell as
its offset from that anchor. The fill may reach the cells in many orders, so
the offsets are sorted before they become the island's signature; the sorted
sequence depends only on the set of cells, never on the traversal. The
signature goes into a hash set, and the answer is that set's size. Shapes that
are rotations or reflections of each other keep different signatures, which is
exactly the rule the statement fixes.

Each cell of the grid is enqueued at most once, so the fills together do
`O(m·n)` work; sorting an island's own cells adds only a logarithmic term over
that island's size, and the queue, the marks, and the signatures all stay
within one copy of the grid.

**Complexity:** `O(m·n)` time, `O(m·n)` space.
