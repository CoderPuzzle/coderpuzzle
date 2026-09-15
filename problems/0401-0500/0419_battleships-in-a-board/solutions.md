# Solutions — Battleships in a Board

## Count ship heads

Every battleship is a straight, unbroken run of `'X'` cells — one row or one
column — and the statement promises that no two battleships are adjacent: at
least one `'.'` cell separates them horizontally and vertically. Under that
promise each ship owns exactly one cell that has no `'X'` above it and no `'X'`
to its left: the leftmost cell of a horizontal ship, the topmost cell of a
vertical one, and the lone cell of a `1 x 1` ship. Every other cell of the ship
is preceded in reading order by a shipmate — to its left in the same row, or
above it in the same column. So a single scan can count ships directly: a cell
contributes one ship exactly when it holds an `'X'` and the cells above and to
its left do not, with the grid edges standing in for "not an `'X'`".

The separation guarantee is load-bearing. If ships were allowed to touch, a row
reading `X X . X X` could be one five-cell ship or two two-cell ships planted
side by side — the drawing would be ambiguous, and the head count would collapse
them into one. An L-shaped blob of `'X'`s has a single such corner yet is not a
legal ship at all. The count is exact precisely because the input is guaranteed
to be a drawing of separated, straight ships, which makes every maximal group of
touching `'X'`s one well-formed ship counted once, at its head.

This is also the Follow-up's answer: one pass over the board, reading cells
only and never writing them, with nothing beyond a counter and the loop
indices. On a `200 x 200` board the ships number at most twenty thousand, far
inside a 32-bit integer.

**Complexity:** `O(mn)` time, `O(1)` space.
