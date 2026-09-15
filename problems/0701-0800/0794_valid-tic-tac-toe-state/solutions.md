# Solutions — Valid Tic-Tac-Toe State

Asking whether a board could arise during a legal game sounds like a search
over the whole game tree, but every rule of play leaves a fixed fingerprint
on the final position, and the fingerprints are checkable in place. Nothing
about the move order matters — the marks carry no timestamps — so the answer
depends only on the tally of X's and O's and on who, if anyone, completed a
line.

## Count marks, then audit the winner

The turn rules fix the tally: X moves first and the players strictly
alternate, so every reachable position carries `x == o` or `x == o + 1`; any
other split is impossible no matter how the marks sit. The ending rules fix
the rest. A game stops at the first completed row, column, or diagonal, so at
most one player may hold a winning line, and the winner's decisive placement
pins the counts exactly — X wins on an X-placement, leaving `x == o + 1`;
O wins on an O-placement, leaving `x == o`. A winner alongside the wrong
tally, or two winners at once, is a board someone kept playing on after the
game had already ended.

The implementation is those gates verbatim: concatenate the three rows,
count `'X'` and `'O'`, reject tallies outside `o` and `o + 1`, then scan the
eight possible lines for each player and reject a double winner, an X win
with `x != o + 1`, and an O win with `x != o`. Everything else is reachable —
one can replay any board passing the gates by taking the marks in an order
that alternates correctly and saves each winner's final mark for last, which
the tally and single-winner conditions guarantee is possible.

**Complexity:** `O(1)` time, `O(1)` space.
