# Solutions — Minimum Operations to Write the Letter Y on a Grid

## Count Y and Background Colors

Only two facts about the grid matter: how many Y cells hold each value and how
many non-Y cells hold each value, so one counting pass replaces any search.

The solution first tallies `yCount[v]` and `otherCount[v]` for `v` in 0..2,
classifying each cell with the Y predicate — the two half diagonals above the
center row and the center column from the center down. A finished grid is
described by an ordered pair `(a, b)` with `a != b`: the Y cells all become
`a`, everything else `b`. Painting the Y with `a` costs `yTotal - yCount[a]`
repaints and painting the rest with `b` costs `otherTotal - otherCount[b]`, so
the answer is the minimum of that sum over the six legal pairs.

**Complexity:** `O(n²)` time for an `n x n` grid — one pass to count plus a
constant 18-pair scan, `O(1)` extra space.
