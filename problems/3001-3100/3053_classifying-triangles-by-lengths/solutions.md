# Solutions — Classifying Triangles by Lengths

## One CASE over the three pairwise tests

A row's verdict comes from two questions asked in order. First, is it
a triangle at all: every pair of sides must sum to strictly more
than the remaining one, and any single failing pair — `A + B <= C`, or
either of the two symmetric comparisons — makes the row
`Not A Triangle` before equalities are ever consulted. Then the
equality pattern names it: `A = B AND B = C` is `Equilateral` (the two
equalities force all three), any single pair equal is `Isosceles`, and
a row surviving both tests has three differing sides and is
`Scalene`. One `CASE` walks each row of `Triangles` and emits exactly
that ladder.

Two details carry the weight. The inequality must be strict: a row
where two sides sum to exactly the third is degenerate, its vertices
collapsed onto one straight line, and it reads `Not A Triangle` even
when two of its sides are equal (`1, 1, 2`), which is why the validity
arms come first. And no side-length sign check is needed: a zero or
negative side always fails one of the three comparisons on its own,
because two strict inequalities involving that side cannot both hold.
The canonical query splits the three inequality failures into three
arms yielding the same label — equivalent to `AND`-ing them into one
arm, as in the sibling triangle-judgement problem, but with every line
short.

Every verdict depends only on its own row, so one scan over the `n`
rows of `Triangles` settles everything and only the output is retained.

**Complexity:** `O(n)` time, `O(1)` space.
