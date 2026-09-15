# Solutions — Coloring A Border

## Identify the component fully, then repaint

Find the connected component containing `(row, col)` with an explicit
queue (not recursion — a serpentine component at the `50 x 50` bound
chains thousands of cells deep, far past any call stack a submission is
granted). A visited matrix, separate from `grid`, marks membership as
cells are enqueued so no cell enters twice.

While walking the component, decide each member's border status against
the ORIGINAL grid, never a grid already being repainted: a cell is a
border cell if it sits on the boundary of the whole grid (row 0 or the
last row, column 0 or the last column), or if any of its 4-directional
neighbors — still holding its original value, since nothing has been
written yet — is not part of the component (a different color, and by
construction adjacency to a different color also means adjacency to a
different component). Collect border cells into a list; the grid itself
stays untouched during this whole identification pass.

Only after every component member has been classified does the second
pass run: repaint each collected border cell to `color`. Because that
overwrite happens strictly after border detection finishes, it cannot
corrupt a later cell's neighbor check — the classic bug this problem
invites. The two-pass split also makes `color` equal to the component's
original color a non-issue: membership and border status were both
decided from values that never change, so the repaint just writes back
what was already there and the output equals the input.

**Complexity:** `O(m·n)` time, `O(m·n)` space.
