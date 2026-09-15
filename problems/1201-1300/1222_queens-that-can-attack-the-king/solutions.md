# Solutions — Queens That Can Attack the King

## Walk the eight rays from the king

A queen attacks the king exactly when she shares a row, column, or diagonal
with him **and** no other piece stands between them. From the king's square,
there are only eight rays to inspect — one per queen movement direction.

For each direction, step outward one square at a time. The first queen met on
that ray attacks (nothing blocks her); the ray stops there, because anything
found further out is shielded. A ray that runs off the board contributes
nothing.

Marking the queens in a boolean board first makes each step an `O(1)` lookup,
and each of the eight walks covers at most seven squares, so the whole scan
is constant work for the fixed 8×8 board.

**Complexity:** `O(q + 1)` time — `q` to mark the board, then a constant 64
squares at most — and `O(1)` space.
