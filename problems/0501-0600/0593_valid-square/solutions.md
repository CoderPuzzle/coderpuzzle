# Solutions — Valid Square

## Six squared distances

Four points determine six pairwise distances — the four sides and two
diagonals of whatever quadrilateral they form — and the input order says
nothing about which pair is which. Computing all six anyway makes the order
irrelevant: sorted, they must read `a, a, a, a, b, b`, four equal sides
followed by two equal diagonals, and nothing else in the plane produces that
multiset. A rhombus keeps the four sides but splits its diagonals; a
rectangle keeps equal diagonals but splits its sides.

The distances are compared as squared lengths. Equal squares are equal
lengths, so the code never takes a square root and floating point never gets
the chance to round two equal distances apart or two different ones
together; the deltas are exact integers, and with coordinates bounded by
`10⁴` even the diagonals stay far below any overflow.

The smallest value carries the last subtlety: four collapsed points, or two
coincident pairs, hand the check equal "distances" of zero that would
otherwise parade as sides. Requiring `a > 0` keeps every side real — the
statement's positive length — and `a < b` keeps the two values distinct,
which is the 90-degree angle arriving through the diagonal.

**Complexity:** `O(1)` time, `O(1)` space.
