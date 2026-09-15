# Solutions — Find Winner on a Tic Tac Toe Game

## Signed tallies with early exit

Give A's placements `+1` and B's `-1` and keep a running tally per row
and column plus the two diagonals. Any tally reaching magnitude 3 is a
completed line, and because the transcript is a valid game the mover who
just completed that line is its owner — so the winner is known the
moment the tally hits ±3 and the walk can stop. If no line completes,
the board is full exactly when nine moves were played: `"Draw"`, else
`"Pending"`.

This avoids materializing the grid or re-scanning eight lines per move:
each move touches O(1) counters, and the win check reads only the four
counters that move could have changed.

**Complexity:** `O(m)` time over `m = moves.length` (at most 9),
`O(1)` space.
