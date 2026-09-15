# Solutions — Check if Move is Legal

## Walk the eight directions from the move cell

The board is only 8 x 8, so a naive check is cheap: after the move places
`color` at `(rMove, cMove)`, that cell must be the endpoint of a good line.
Because it is an endpoint, every other cell of the line lies in a single
straight direction, so each of the eight compass directions can be examined
independently.

In a direction `(dr, dc)` the move is legal exactly when the neighboring cell
is already the opposite color and, continuing in that direction, every cell
stays the opposite color until a cell of the move's own `color` is reached.
That final cell is the other endpoint of the good line; at least one opposite
cell in between guarantees the line has the required three cells. The scan
skips any direction that leaves the board, meets a free cell, or meets the
move color before finding an endpoint, since none of those can complete a
good line.

The walk is bounded by the fixed board size, so each direction inspects at
most seven cells and the whole check runs in constant time regardless of the
contents of the board.

**Complexity:** `O(1)` time, `O(1)` space.
