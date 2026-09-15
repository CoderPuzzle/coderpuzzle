# Solutions — Design Neighbor Sum Service

## Index coordinates at construction, four offsets per query

Every query is about one value's surroundings, so the only thing worth
remembering is where each value sits. The constructor walks the grid once and
records the coordinates of every value — values being distinct, each claims
exactly one cell. A query then looks its value up and adds the four orthogonal
(or the four diagonal) cells around that spot, skipping whichever offsets fall
outside the board: a corner has three in-bounds neighbors of one kind, an edge
five of the other, an interior eight in total, and the arithmetic needs no
special cases for any of them.

In example 2, value 15 sits at row 1, column 2, so `adjacentSum(15)` adds its
up, left, right, and down cells — 0, 7, 6, and 10 — for 23; value 9 sits at
row 2, column 1, and `diagonalSum(9)` adds 4, 15, 12, and 14 for 45. The
alternative of scanning the whole grid to locate the queried value on every
call answers just as correctly but pays `O(n²)` work per query; the index
front-loads all of that into construction and makes each call constant work.

**Complexity:** `O(n²)` construction, `O(1)` per query.
