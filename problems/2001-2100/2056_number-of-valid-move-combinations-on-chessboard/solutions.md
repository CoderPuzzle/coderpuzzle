# Solutions — Number of Valid Move Combinations On Chessboard

## Backtrack over direction and distance

For each piece, enumerate staying put plus every reachable square as a move
`(dr, dc, steps)`: rooks use four orthogonal directions, bishops four
diagonals, and the queen all eight. Backtracking chooses one move per piece.
Whenever a move is added, compare it with each already-chosen move at every
integer second from `0` through `7`; a piece's square is its start plus its
direction times `min(second, steps)`. Reject the branch if two squares match.

Checking only integer seconds implements the simultaneous-motion rule exactly.
In particular, adjacent pieces that exchange squares remain distinct at both
seconds and are accepted even though their paths cross between them. A piece
that stops continues to occupy its destination, so the same check also rejects
another piece arriving there later.

**Complexity:** `O((Π Mᵢ) * n² * 8)` time and `O(n)` recursion/state space, where `Mᵢ` is the number of moves available to piece `i`.
